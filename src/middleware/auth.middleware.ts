import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  /**
   * Middleware to check if the Authorization header contains "abc".
   *
   * @param req - The incoming HTTP request object.
   * @param res - The outgoing HTTP response object.
   * @param next - The next middleware function in the request-response cycle.
   * @throws UnauthorizedException if the Authorization header is missing or does not contain "abc".
   */
  use(req: Request, res: Response, next: NextFunction) {
    // Get the Authorization header from the request
    const authHeader = req.headers['authorization'];

    // Check if the Authorization header is present and contains "abc"
    if (!authHeader || !authHeader.includes('abc')) {
      // If not, throw an UnauthorizedException
      throw new UnauthorizedException(
        'Authorization header must contain "abc"',
      );
    }

    // If the Authorization header is valid, proceed to the next middleware or controller
    next();
  }
}
