import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  // type: process.env.DB_TYPE as any,
  type: 'mysql',
  host: process.env.MY_SQL_HOST,
  port: parseInt(process.env.MY_SQL_PORT, 10),
  username: process.env.MY_SQL_USERNAME,
  password: process.env.MY_SQL_PASSWORD,
  database: process.env.MY_SQL_DATABASE,
  entities: [User],
  synchronize: true, // Disable in production
};
