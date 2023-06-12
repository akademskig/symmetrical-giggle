import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(app.get(ConfigService).get('APP_PORT'), () =>
    Logger.log(`App running on ${process.env.PORT}`)
  );
}
bootstrap();
