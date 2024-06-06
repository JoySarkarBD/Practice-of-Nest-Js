import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cors from 'cors';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  /**
   * Middleware function to handle CORS (Cross-Origin Resource Sharing) requests.
   * @param req - The incoming HTTP request object.
   * @param res - The HTTP response object.
   * @param next - The next function to call in the middleware chain.
   */
  use(req: Request, res: Response, next: NextFunction) {
    // List of allowed domains
    const allowedOrigins = ['http://example1.com', 'http://example2.com'];

    // Determine the CORS origin based on the environment
    const corsOrigin =
      process.env.NODE_ENV === 'production'
        ? (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
            } else {
              callback(new Error('Not allowed by CORS'));
            }
          }
        : true; // Allow all origins in development

    // Configure CORS options
    const corsOptions: cors.CorsOptions = {
      origin: corsOrigin, // Set the CORS origin based on the environment
    };

    // Apply CORS middleware with configured options
    cors(corsOptions)(req, res, next);
  }
}
