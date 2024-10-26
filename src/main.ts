import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvVariablesService } from './Shared/domain/config/env-variables.service';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(
    new LoggerErrorInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, stopAtFirstError: true }),
  );

  const configService = app.get(EnvVariablesService);
  const appPort = configService.AppPort;
  await app.listen(appPort);
}
bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});
