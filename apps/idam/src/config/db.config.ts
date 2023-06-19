import { registerAs } from '@nestjs/config';
import * as joi from 'joi';

export default registerAs('mongo', () => ({
  uri: process.env.MONGO_URL,
  dbName: process.env.DB_NAME,
}));

export const databaseValidationSchema = {
  MONGO_URL: joi.string().required(),
  DB_NAME: joi.string().required(),
};
