import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as morgan from 'morgan';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  /**
   * Middleware function to log HTTP requests using Morgan.
   * @param req - The incoming HTTP request object.
   * @param res - The HTTP response object.
   * @param next - The next function to call in the middleware chain.
   */
  use(req: Request, res: Response, next: NextFunction) {
    // Configure Morgan to log requests in 'combined' format
    morgan('combined')(req, res, next);
  }
}
