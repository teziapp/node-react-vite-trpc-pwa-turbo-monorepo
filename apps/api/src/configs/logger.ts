import winston from "winston";
import envConfig from "./envConfig";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: envConfig.NODE_ENV === 'prod' ? 'info' : 'debug',
  format: winston.format.combine(
    enumerateErrorFormat(),
    envConfig.NODE_ENV === 'prod' ? winston.format.uncolorize() : winston.format.colorize(),
    winston.format.json(),
    winston.format.printf(({ level, message }) => `${level}: ${typeof message === 'object' ? JSON.stringify(message, null, 2) : message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    }),
  ]
});

if (envConfig.NODE_ENV === 'prod') {
  logger.add(new winston.transports.File({
    filename: `${(new Date().toISOString()).substring(0,9)}error.log`, level: 'error'
  }));
  logger.add(new winston.transports.File({
    filename: `${(new Date().toISOString()).substring(0,9)}combined.log`
  }));
};

export default logger;