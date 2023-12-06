import exclude from "../utils/exclude";
import { uaParser } from "../utils/uaParser";
import { T_TokenObj, verifyToken } from "./token.service";

export const authenticateReq = async (
  token?: string,
  ua?: string
) => {
  const userWithUa = token && await verifyToken(token);

  if (!userWithUa) throw new Error('UNAUTHORIZED');

  if (!userWithUa.og_id) throw new Error('FORBIDDEN');

  // If somebody copies the token & tries to use it from other device, most probably they wont get access.
  const { uaTokenItems } = uaParser(ua);
  const uaKeys = Object.keys(userWithUa.ua) as (keyof T_TokenObj['ua'])[];
  if( uaKeys.some((key) => userWithUa.ua[key] !== uaTokenItems[key]) ) {
    throw new Error('UNAUTHORIZED');
  };
  
  return exclude(userWithUa, ['ua']);
}