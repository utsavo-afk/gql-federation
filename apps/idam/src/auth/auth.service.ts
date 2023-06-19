import { Injectable } from '@nestjs/common';
import { SignupInput } from './dto/sign-up.input';
import { SigninInput } from './dto/sign-in.input';
import { UsersService } from '../users/users.service';
import { HashingService } from './hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(signupInput: SignupInput) {
    const hashed = await this.hashingService.hash(signupInput.password);
    return this.usersService.create({
      ...signupInput,
      password: hashed,
    });
  }

  async signIn(signinInput: SigninInput) {
    const found = await this.usersService.findByEmail(signinInput.email);
    if (!found) {
      throw new Error('Invalid email/password');
    }
    const isMatch = await this.hashingService.compare(
      signinInput.password,
      found.password,
    );
    if (!isMatch) {
      throw new Error('Invalid email/password');
    }
    // token logic here.
    return found;
  }
}
