import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './config/env.config';
import { setupSwagger } from './config/swg.config';
import { setopCors } from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setopCors(app);
  setupSwagger(app);
  await app.listen(ENV.PORT);
}
bootstrap();
