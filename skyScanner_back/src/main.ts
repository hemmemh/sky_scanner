import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const allowedOrigins = [process.env.FRONT_URL, 'https://accounts.google.com'];
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(
    {
      origin: allowedOrigins, // Укажите ваш фронтенд URL
      credentials: true, // Включите учетные данные
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Разрешите нужные методы

    },
)
  app.use(cookieParser());
  await app.listen(5100);
}
bootstrap();
