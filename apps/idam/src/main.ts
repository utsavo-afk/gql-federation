import { NestFactory } from '@nestjs/core';
import { IdamModule } from './idam.module';

async function bootstrap() {
  const app = await NestFactory.create(IdamModule);
  await app.listen(3001);
}
bootstrap();
