import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true
});