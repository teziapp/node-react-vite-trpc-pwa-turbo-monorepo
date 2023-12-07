import { Response } from "express";
import httpStatus from "http-status";
import envConfig from "../configs/envConfig";
import logger from "../configs/logger";
import { authenticateReq } from "../services/authenticateReq.service";
import { getActiveLicCount } from "../services/licenses.service";
import { T_TokenObj } from "../services/token.service";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import exclude from "../utils/exclude";
import { getIpAddress } from "../utils/getIpAddress";
import { uaParser } from "../utils/uaParser";

export type T_User_Online = {
  ipAddress: string | undefined;
  login_id: number;
  og_id: number;
  ua: Omit<T_TokenObj['ua'], 'cpu_architecture' | 'device_model' | 'engine_name' | 'engine_version'>;
  user_id: number;
  res: Response
};

let clients = new Map<number, T_User_Online>();;

const sseMessage = (input: {}) => typeof input === 'object'
  ? `data: ${JSON.stringify(input)}\n\n`
  : `data: ${input}\n\n`;

const writeSseMsg = (res: Response, input: {}) => {
  res.write(sseMessage(input));  
  // Build Error: error TS2339: Property 'flush' does not exist on type 'Response<any, Record<string, any>>'.
  // @ts-ignore 
  res.flush();
}
let intervalID: NodeJS.Timeout;

export const sseEventsHandler = catchAsync(async (req, res) => {
  try {
    const ua = req.headers['user-agent'];
    const user = await authenticateReq(req.cookies.access_token, ua);

    if(!user.og_id) throw new ApiError(httpStatus.BAD_REQUEST, 'Ownergroup is missing');

    logger.info(`Login ID: ${user.login_id} connection open`);
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);

    req.on('close', () => {
      logger.info(`Login ID: ${user.login_id} SSE connection closed.`);
      clients.delete(user.login_id);
      clearInterval(intervalID);
      console.log('No. of active sessions:' + clients.size)
    });
    
    // check if existing active sessions exists for same login_id to handle multiple-tabs
      if (clients.get(user.login_id)) {
        writeSseMsg(res, 'Active Connection exists.');
        logger.info('Other active connection exists');
        return;
      };
      
    // Check for number of seats.
      const { activeLicCount } = await getActiveLicCount({
        input: {
          og_id: user.og_id, 
          project_id: envConfig.SUBSMANAGER_PROJECT_ID
        }
      });
      
    // get active sessions other than current user
      const activeSessions: Omit<T_User_Online, 'res'>[] = [];
      clients.forEach(
        (value) => (value.login_id !== user.login_id && value.og_id === user.og_id) 
          && activeSessions.push(exclude(value, ['res'])
        )
      );
      
    // if active-licenses is less than active-sessions, send existing active sessions details.
      if (activeLicCount < activeSessions.length) {
        writeSseMsg(res, {activeSessions});
        logger.alert(`${activeSessions.length} other users online.`)
        return;
      }
      
    // send success message.
      writeSseMsg(res, 'Success');
      logger.info('Connection success message sent to client.');

    // add client to existing connections.
    // TODO: Need to add user name & user role here.
      const newClient = {
        ipAddress: getIpAddress(req),
        login_id: user.login_id,
        og_id: user.og_id,
        ua: exclude(uaParser(ua).uaTokenItems, ['cpu_architecture', 'device_model', 'engine_name', 'engine_version']),
        user_id: user.user_id,
        res
      };

      clients.set(user.login_id, newClient);

      intervalID = setInterval(() => console.log('No. of active sessions:' + clients.size), 60000);

  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authorised. Please login.')
    }
    else if (error.message === 'FORBIDDEN') {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden. Please contact admin.')
    };
  }
})