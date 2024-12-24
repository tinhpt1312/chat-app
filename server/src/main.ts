import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './config/env.config';
import { setupSwagger } from './config/swg.config';
import { setopCors } from './config/cors.config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  setopCors(app);

  setupSwagger(app);

  await app.listen(ENV.PORT, () => {
    const LOCAL_DOMAIN = `http://localhost`;

    Logger.log(`API Server running on ${LOCAL_DOMAIN}:${ENV.PORT}/api`);
  });
}
bootstrap();
