// src/middleware/morgan.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as morgan from 'morgan';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Configure Morgan to log requests in 'combined' format
    morgan('combined')(req, res, next);
  }
}
