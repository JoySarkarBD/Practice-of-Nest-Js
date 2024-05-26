import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
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
