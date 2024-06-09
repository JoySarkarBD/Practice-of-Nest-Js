import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  /**
   * Intercepts the response and processes it through the response handler and error handler.
   * @param context - The execution context of the request.
   * @param next - The next call handler in the chain.
   * @returns The processed response or error.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: any) => this.responseHandler(res, context)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  /**
   * Handles any errors that occur during the request processing.
   * @param exception - The exception that was thrown.
   * @param context - The execution context of the request.
   * @returns A formatted error response.
   */
  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const method = request.method;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = exception.getResponse();
    const formattedErrors = {};

    // Check if the errorResponse is an object and has a message property
    if (typeof errorResponse === 'object' && errorResponse['message']) {
      const messages = errorResponse['message'];

      // Iterate through each message and format it accordingly
      if (Array.isArray(messages)) {
        messages.forEach((msg: any) => {
          if (msg.property && msg.constraints) {
            const property = msg.property;
            if (!formattedErrors[property]) {
              formattedErrors[property] = [];
            }
            formattedErrors[property].push(...Object.values(msg.constraints));
          }
        });
      }
    }

    response.status(status).json({
      status: false,
      statusCode: status,
      path: request.url,
      method,
      timestamp: new Date().toISOString(),
      message: formattedErrors,
    });
  }

  /**
   * Handles the response before sending it to the client.
   * @param res - The response object.
   * @param context - The execution context of the request.
   * @returns A formatted response.
   */
  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const method = request.method;
    const statusCode = response.statusCode;

    const status = res.status !== undefined ? res.status : true;
    const message =
      res.message || (status ? 'Operation successful' : 'Operation failed');
    const data = res.data !== undefined ? res.data : res;

    // If the response data is null or falsy, return an error response
    if (data === null || !data) {
      return {
        status: status,
        statusCode: statusCode,
        path: request.url,
        method,
        timestamp: new Date().toISOString(),
        message: message,
      };
    }
    return {
      status: status,
      statusCode: statusCode,
      path: request.url,
      method,
      timestamp: new Date().toISOString(),
      message: message,
      result: data,
    };
  }
}
