import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CookieParserMiddleware } from './core-modules/middlewares/cookie-parser.middleware';
import { CorsMiddleware } from './core-modules/middlewares/cors.middleware';
import { HelmetMiddleware } from './core-modules/middlewares/helmet.middleware';
import { MorganMiddleware } from './core-modules/middlewares/morgan.middleware';
import { RateLimitMiddleware } from './core-modules/middlewares/rate-limit.middleware';
import { Users } from './users/schemas/user.schema';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      database: 'nest',
      useUnifiedTopology: true,
      entities: [Users], // Add your entities here
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
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
