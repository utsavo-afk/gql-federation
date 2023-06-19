import { Module } from '@nestjs/common';
import {
  ConfigModule as BaseConfigModule,
  ConfigService,
} from '@nestjs/config';
import dbConfig, { databaseValidationSchema } from './db.config';
import * as joi from 'joi';

@Module({
  imports: [
    BaseConfigModule.forRoot({
      envFilePath: `${process.cwd()}/apps/idam/env/.env.${
        process.env.NODE_ENV
      }`,
      load: [dbConfig],
      cache: true,
      validationSchema: joi.object({
        ...databaseValidationSchema,
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
