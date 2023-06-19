import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [
    AuthResolver,
    AuthService,
    {
      provide: HashingService,
      // can swap our hashing service
      useClass: BcryptService,
    },
  ],
})
export class AuthModule {}
