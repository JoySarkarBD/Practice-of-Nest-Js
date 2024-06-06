import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

// Create the rate limit instance outside the middleware class
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  /**
   * Middleware function to apply rate limiting to incoming requests.
   * Rate limiting is only applied in production mode.
   * @param req - The incoming HTTP request object.
   * @param res - The HTTP response object.
   * @param next - The next function to call in the middleware chain.
   */
  use(req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV === 'production') {
      // Apply the rate limit middleware instance
      limiter(req, res, next);
    } else {
      // No rate limiting in developer mode
      next();
    }
  }
}
