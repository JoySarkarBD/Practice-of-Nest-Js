import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Exception filter to handle HTTP exceptions in production mode.
 * This filter customizes the response message based on the environment.
 */
@Catch(HttpException)
export class ProductionExceptionFilter implements ExceptionFilter {
  /**
   * Method to catch and handle HTTP exceptions.
   * @param exception - The HTTP exception instance.
   * @param host - The argument host containing the request and response objects.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      process.env.NODE_ENV === 'production' ? 200 : exception.getStatus();
    const message = exception.message || 'Internal server error';
    const method = request.method;

    // Customize the response message based on the environment
    response.status(status).json({
      statusCode: status,
      message,
      method,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
