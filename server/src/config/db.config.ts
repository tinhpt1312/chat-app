import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ENV } from './env.config';

@Injectable()
export class PostgresConfiguration implements TypeOrmOptionsFactory {
  constructor() {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: ENV.DATABASE.HOST,
      port: ENV.DATABASE.PORT,
      username: ENV.DATABASE.USER,
      password: ENV.DATABASE.PASS,
      database: ENV.DATABASE.DATA,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      subscribers: [__dirname + '/../**/*.subscriber.{js,ts}'],
      synchronize: true,
      logging: false,
      logger: 'advanced-console',
    };
  }
}
