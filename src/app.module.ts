import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorsMiddleware } from './middleware/cors.middleware';
import { HelmetMiddleware } from './middleware/helmet.middleware';
import { MorganMiddleware } from './middleware/morgan.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply Morgan middleware to log HTTP requests.
    // Apply Helmet middleware to enhance security by setting security-related HTTP response headers. The 'csp' middleware sets the Content-Security-Policy header to prevent XSS attacks, while 'hidePoweredBy' removes the X-Powered-By header.
    // Apply CORS middleware to enable Cross-Origin Resource Sharing (CORS), allowing resources to be requested from another domain.

    consumer
      .apply(MorganMiddleware, CorsMiddleware, HelmetMiddleware)
      .forRoutes('*'); // Apply Morgan middleware to all routes
  }
}

/* The configure method is used to apply middleware to routes. */
// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes(UsersController); // Apply the AuthMiddleware to all routes defined in the UsersController.
//   }
// }

// This is the way to add the middleware to the whole module form the root app module, we can simply use this inside of out desire module like in our case it's user module
// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes(
//       { path: 'users', method: RequestMethod.ALL }, // Apply to root path
//       { path: 'users/*', method: RequestMethod.ALL }, // Apply to all sub routes in UsersController
//     );
//   }
// }

/* This is the way to add the middleware to the specific route form the root app module, we can simply use this inside of out desire module like in our case it's user module */
// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes(
//       { path: 'users/get-all-users', method: RequestMethod.GET }, // Apply to GET /users/get-all-users
//       { path: 'users/create-user', method: RequestMethod.POST }, // Apply to POST /users/create-user
//       { path: 'users/:id', method: RequestMethod.GET }, // Apply to GET /users/:id
//     );
//   }
// }
