import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductionExceptionFilter } from './exception-filter/custom-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { CookieParserMiddleware } from './middleware/cookie-parser.middleware';
import { CorsMiddleware } from './middleware/cors.middleware';
import { HelmetMiddleware } from './middleware/helmet.middleware';
import { MorganMiddleware } from './middleware/morgan.middleware';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ProductionExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply Morgan middleware to log HTTP requests.
    // Apply Helmet middleware to enhance security by setting security-related HTTP response headers.
    // Apply CORS middleware to enable Cross-Origin Resource Sharing (CORS), allowing resources to be requested from another domain.
    // Apply cookie-parser middleware to parse cookies from incoming requests.
    // Apply rate-limit middleware to limit the rate of incoming requests from clients.

    consumer
      .apply(
        MorganMiddleware,
        CorsMiddleware,
        HelmetMiddleware,
        CookieParserMiddleware,
        RateLimitMiddleware,
      )
      .forRoutes('*'); // Apply middlewares to all routes
  }
}

// Commented out sections demonstrating different ways to apply middleware, kept for reference.
/* 
// The configure method is used to apply middleware to routes.
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UsersController); // Apply the AuthMiddleware to all routes defined in the UsersController.
  }
}

// This is the way to add the middleware to the whole module from the root app module. We can simply use this inside of our desired module, like in our case it's the user module.
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: 'users', method: RequestMethod.ALL }, // Apply to root path
      { path: 'users/*', method: RequestMethod.ALL }, // Apply to all sub-routes in UsersController
    );
  }
}

// This is the way to add the middleware to the specific route from the root app module. We can simply use this inside of our desired module, like in our case it's the user module.
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: 'users/get-all-users', method: RequestMethod.GET }, // Apply to GET /users/get-all-users
      { path: 'users/create-user', method: RequestMethod.POST }, // Apply to POST /users/create-user
      { path: 'users/:id', method: RequestMethod.GET }, // Apply to GET /users/:id
    );
  }
}
*/
