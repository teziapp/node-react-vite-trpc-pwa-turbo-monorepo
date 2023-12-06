class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  customMessage: string;

  constructor(statusCode: number, message: string | undefined, isOperational = true, stack = '', customMessage = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.customMessage = customMessage;
    if (stack) {
      this.stack = stack;
    }
    else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

export default ApiError;