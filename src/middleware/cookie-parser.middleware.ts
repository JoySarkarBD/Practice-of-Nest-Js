import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {
  /**
   * Middleware function to parse cookies from incoming requests using Cookie Parser.
   * @param req - The incoming HTTP request object.
   * @param res - The HTTP response object.
   * @param next - The next function to call in the middleware chain.
   */
  use(req: Request, res: Response, next: NextFunction) {
    cookieParser()(req, res, next);
  }
}
