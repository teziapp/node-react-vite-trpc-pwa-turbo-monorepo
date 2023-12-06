import { Request } from "express";

export const getIpAddress = (req: Request) => req.headers.forwarded 
  || (req.headers["x-forwarded"] && req.headers["x-forwarded"][0])
  || (req.headers["x-forwarded-for"] && req.headers["x-forwarded-for"][0])
  || (req.headers["forwarded-for"] && req.headers["forwarded-for"][0])
  || req.socket.remoteAddress;