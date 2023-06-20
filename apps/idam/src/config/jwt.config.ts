import { registerAs } from '@nestjs/config';
import * as joi from 'joi';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
}));

export const jwtConfigValidationSchema = {
  JWT_SECRET: joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: joi.number().required(),
  JWT_AUDIENCE: joi.string().required(),
  JWT_ISSUER: joi.string().required(),
};
