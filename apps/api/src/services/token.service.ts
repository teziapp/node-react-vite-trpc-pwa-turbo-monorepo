import { addDays, getUnixTime } from "date-fns";
import jwt from 'jsonwebtoken';
import envConfig from '../configs/envConfig';
import { getUserLicense } from "./getUserLicense.service";

export type T_TokenObj = (Partial<Awaited<ReturnType<typeof getUserLicense>>>) & {
  login_id: number;
  user_id: number;
  ua: {
    browser_name: string | undefined;
    cpu_architecture: string | undefined;
    device_model: string | undefined;
    device_type: string | undefined;
    device_vendor: string | undefined;
    engine_name: string | undefined;
    engine_version: string | undefined;
    os_name: string | undefined;
  }
};

type T_TokenPayload = {
  sub: T_TokenObj;
  iat: number;
  exp: number;
  type: 'access';
};

export const getAccessToken = (user: T_TokenObj, maxExpiryDate?: string | Date) => {
  const accessTokenExpires = addDays(new Date(), envConfig.JWT_ACCESS_EXPIRATION_DAYS);
  const maxDate = maxExpiryDate ? new Date(maxExpiryDate) : false;
  
  const tokenExpiryDate = (maxDate && (maxDate < accessTokenExpires)) ? maxDate : accessTokenExpires;
  
  const payload: T_TokenPayload = {
    sub: user,
    iat: getUnixTime(new Date()),
    exp: getUnixTime(tokenExpiryDate),
    type: 'access'
  };

  return {
    token: jwt.sign(payload, envConfig.JWT_SECRET),
    expires: tokenExpiryDate.toISOString()
  };
};

export const verifyToken = (token: string) => new Promise<T_TokenObj | undefined>((resolve, reject) => {
  jwt.verify(
      token, 
      envConfig.JWT_SECRET,
      (err: any, decoded?: any) => {
          // console.log({decoded});
          if(err || typeof decoded === 'string') reject(err);
          else resolve(decoded?.sub);
      }
  )
});