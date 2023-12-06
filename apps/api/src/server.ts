import http, { Server } from "http";

import app from "./app";
import envConfig from "./configs/envConfig";
import logger from "./configs/logger";
import { dbConnection } from "./db/dbConnection";

let server: Server 
dbConnection().then((isDbConnected) => {
  if (isDbConnected) {
    server = http.createServer(app);
    const port = envConfig.SERVER_PORT || 3001;
    server.listen(port, () => console.log(`🚀 Server is live at http://localhost:${envConfig.SERVER_PORT}`));
  }
  else {
    throw new Error("Database not connected.")
  };
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed.');
      process.exit(1);
    });
  }
  else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
      server.close();
  }
});