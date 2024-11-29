import { Module } from '@nestjs/common';
import { ChatModule } from './modules/chat/chat.module';
import { PostgresConfiguration } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfiguration,
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
