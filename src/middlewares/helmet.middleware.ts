import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  /**
   * Middleware function to apply Helmet security headers to the HTTP response.
   * @param req - The incoming HTTP request object.
   * @param res - The HTTP response object.
   * @param next - The next function to call in the middleware chain.
   */
  use(req: Request, res: Response, next: NextFunction) {
    helmet()(req, res, next);
  }
}
