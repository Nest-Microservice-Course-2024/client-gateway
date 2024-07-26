import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { envs } from './config';
import { AppModule } from './app.module';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  app.useGlobalFilters(new RpcCustomExceptionFilter());
  await app.listen(envs.port);
  logger.log(`Gateway running on http://localhost:${envs.port}`);
}
bootstrap();
