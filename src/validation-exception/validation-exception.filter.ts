import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

/**
 * Exception filter to handle validation errors thrown by the application.
 * This filter formats and sends a response containing the validation errors.
 */
@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  /**
   * Method to catch and handle the validation exception.
   * @param exception - The validation exception instance.
   * @param host - The argument host containing the request and response objects.
   */
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const validationErrors = (exceptionResponse as any).message;

    const formattedErrors = this.formatErrors(validationErrors);

    response.status(status).json({
      message: formattedErrors,
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  /**
   * Method to format validation errors into a structured format.
   * @param errors - The array of validation errors.
   * @returns The formatted validation errors.
   */
  private formatErrors(errors: ValidationError[]) {
    const result = {};

    errors.forEach((error) => {
      const property = error.property;
      const constraints = error.constraints;

      if (!result[property]) {
        result[property] = [];
      }

      for (const key in constraints) {
        result[property].push(constraints[key]);
      }
    });

    return result;
  }
}
