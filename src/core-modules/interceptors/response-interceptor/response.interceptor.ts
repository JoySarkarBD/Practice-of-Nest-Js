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
   * Intercepts the request/response flow and processes the response or handles errors.
   * @param context - The execution context of the request.
   * @param next - The next handler in the pipeline.
   * @returns An Observable with the formatted response or error.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      // Format the response before sending it to the client.
      map((res) => this.formatResponse(res, context)),
      // Handle errors and format them before sending to the client.
      catchError((err) => {
        this.handleError(err, context);
        return throwError(() => err);
      }),
    );
  }

  /**
   * Handles and formats errors consistently.
   * @param exception - The thrown HttpException or other error.
   * @param context - The execution context of the request.
   */
  private handleError(
    exception: HttpException | any,
    context: ExecutionContext,
  ) {
    const { method, url } = context.switchToHttp().getRequest(); // Extract method and URL from the request.
    const response = context.switchToHttp().getResponse(); // Get the Response object from the context.

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = exception.getResponse
      ? exception.getResponse()
      : { message: 'An unexpected error occurred' };

    const formattedErrors = Array.isArray(errorResponse?.['message'])
      ? errorResponse['message'].reduce((acc, { property, constraints }) => {
          if (property && constraints) {
            acc[property] = [
              ...(acc[property] || []),
              ...Object.values(constraints),
            ];
          }
          return acc;
        }, {})
      : errorResponse?.['message'] || errorResponse;

    response.status(status).json({
      status: false,
      statusCode: status,
      path: url,
      method,
      timestamp: new Date().toISOString(),
      message: formattedErrors,
    });
  }

  /**
   * Formats successful responses consistently.
   * @param res - The original response object.
   * @param context - The execution context of the request.
   * @returns A formatted response object.
   */
  private formatResponse(res: any, context: ExecutionContext) {
    const { method, url } = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // If the response indicates a failure, return error format without result
    if (res?.status === false) {
      response.status(res.statusCode || 400).json({
        status: false,
        statusCode: res.statusCode || 400,
        path: url,
        method,
        timestamp: new Date().toISOString(),
        message: res.message,
      });
      return;
    }

    const statusCode = res?.statusCode ?? response.statusCode;
    const status = res?.status ?? true;
    const message =
      res?.message || (status ? 'Operation successful' : 'Operation failed');
    const result = res?.data ?? res;

    response.status(statusCode).json({
      status,
      statusCode,
      path: url,
      method,
      timestamp: new Date().toISOString(),
      message,
      ...(res?.data && { data: result }),
    });
  }
}
