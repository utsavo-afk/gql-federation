import { Module } from '@nestjs/common';
import {
  ConfigModule as BaseConfigModule,
  ConfigService,
} from '@nestjs/config';
import dbConfig, { databaseConfigValidationSchema } from './db.config';
import * as joi from 'joi';
import jwtConfig, { jwtConfigValidationSchema } from './jwt.config';

@Module({
  imports: [
    BaseConfigModule.forRoot({
      envFilePath: `${process.cwd()}/apps/idam/env/.env.${
        process.env.NODE_ENV
      }`,
      load: [jwtConfig, dbConfig],
      cache: true,
      validationSchema: joi.object({
        ...databaseConfigValidationSchema,
        ...jwtConfigValidationSchema,
      }),
      validationOptions: {
        abortEarly: true,
        debug: true,
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
