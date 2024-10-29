import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { schemaEnvVariables } from '../Shared/domain/config/schema-env-variables';
import { EnvVariablesService } from '../Shared/domain/config/env-variables.service';
import { join } from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '..', '..', '.env'),
      validationSchema: schemaEnvVariables,
      validationOptions: {
        stripUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  controllers: [],
  providers: [EnvVariablesService],
  exports: [EnvVariablesService],
})
export class SharedModule {}
