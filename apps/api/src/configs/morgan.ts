import { Response } from 'express';
import morgan from 'morgan';
import envConfig from './envConfig';
import logger from './logger';

morgan.token('message', (_req, res: Response) => res.locals.errorMessage || '');

const getIpFormat = () => (envConfig.NODE_ENV === 'dev' ? '' : ':remote-addr-');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (_req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()), }
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (_req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim())}
});

export default {
  successHandler,
  errorHandler
}