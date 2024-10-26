import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ENVS } from './schema-env-variables';

@Injectable()
export class EnvVariablesService {
  constructor(private configService: ConfigService) {}

  get IsDevEnv(): boolean {
    return [ENVS.LOCAL, ENVS.DEVELOPMENT].includes(
      this.configService.get('NODE_ENV'),
    );
  }

  get IsLocal(): boolean {
    return this.configService.get('NODE_ENV') === ENVS.LOCAL;
  }

  get RunningEnv() {
    return this.IsDevEnv ? 'pre' : 'pro';
  }

  get AppPort(): number {
    return this.configService.get<number>('PORT');
  }
  get MongoUri(): string {
    return this.configService.get('MONGO_URI');
  }

  get MongoDbName(): string {
    return this.configService.get('DB_NAME');
  }
}
