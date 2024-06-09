import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { configDotenv } from 'dotenv'; // Import configDotenv function from 'dotenv' library
import { AppModule } from './app.module';
import { ResponseInterceptor } from './core-modules/interceptors/response-interceptor/response.interceptor';
import { setupSwagger } from './core-modules/swagger/swagger.config';

async function bootstrap() {
  // Load environment variables from .env file
  configDotenv();

  // Create a new NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Set a global prefix for all routes
  app.setGlobalPrefix('api/v1');

  // Set up global validation pipe with custom exception factory
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        // Create a BadRequestException with the validation errors
        return new BadRequestException(errors);
      },
    }),
  );

  // Setup Swagger documentation
  setupSwagger(app);

  // Use a global interceptor for response handling
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Start the application and listen on the specified port
  await app.listen(process.env.PORT || 8080, () => {
    // Log the application URL and Swagger documentation URL
    console.log(
      `Application is running at http://localhost:${process.env.PORT}`,
    );
    console.log(
      `Application's API documentation is available at http://localhost:${process.env.PORT}/api`,
    );
  });
}

// Call the bootstrap function to start the application
bootstrap();
