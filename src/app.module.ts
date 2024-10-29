import { Module } from '@nestjs/common';
import { SharedModule } from './Shared/shared.module';
import { ENVS } from './Shared/domain/config/schema-env-variables';
import { EnvVariablesService } from './Shared/domain/config/env-variables.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [EnvVariablesService],
      useFactory: (envVariablesService: EnvVariablesService) => {
        console.log(envVariablesService.MongoUri);
        return {
          uri: envVariablesService.MongoUri,
          dbName: envVariablesService.MongoDbName,
          retryAttempts: 3,
          retryWrites: false,
          ssl: true,
        };
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV === ENVS.LOCAL
            ? { target: 'pino-pretty' }
            : undefined,
        serializers: {
          req(req) {
            req.body = req.raw.body;
            return req;
          },
        },
      },
    }),
    SharedModule,
  ],
})
export class AppModule {}
