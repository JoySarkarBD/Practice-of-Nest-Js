import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Interceptor to transform HTTP responses and handle errors.
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  /**
   * Method to intercept HTTP requests and responses.
   * @param context - The execution context.
   * @param next - The call handler.
   * @returns An observable of the transformed response.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Extract the HTTP request object to get method and URL
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const path = request.url;

    return next.handle().pipe(
      // Transform successful responses
      map((data) => {
        const statusCode = 200; // Always return 200 for successful responses
        const message = 'Success'; // Success message
        const result = data; // The actual response data
        const timestamp = new Date().toISOString(); // Timestamp of the response

        // Return the transformed response
        return {
          statusCode,
          message,
          result,
          method,
          timestamp,
          path,
        };
      }),
      // Handle errors and transform the error responses
      catchError((error) => {
        const status =
          process.env.NODE_ENV === 'production'
            ? 200 // Always return 200 in production mode
            : error instanceof HttpException
              ? error.getStatus() // Get the actual status code if it's an HttpException
              : 500; // Default to 500 if it's another type of error
        const message =
          process.env.NODE_ENV === 'production'
            ? 'Internal server error' // Generic message in production mode
            : error.message; // Actual error message in development mode

        // Throw the transformed error response
        return throwError(() => ({
          statusCode: status,
          message,
          timestamp: new Date().toISOString(), // Timestamp of the error
          path,
          method,
        }));
      }),
    );
  }
}
