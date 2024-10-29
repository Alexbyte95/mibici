import * as Joi from 'joi';

export enum ENVS {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  PROD = 'production',
}

export const schemaEnvVariables = Joi.object({
  NODE_ENV: Joi.string()
    .pattern(/development|production|local/)
    .default('development'),
  PORT: Joi.number().default(8000),
});
