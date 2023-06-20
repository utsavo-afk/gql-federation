import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupInput } from './dto/sign-up.input';
import { SigninInput } from './dto/sign-in.input';
import { UsersService } from '../users/users.service';
import { HashingService } from './hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
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
      throw new UnauthorizedException('Check email/password.');
    }
    const isMatch = await this.hashingService.compare(
      signinInput.password,
      found.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Email/Password does not match.');
    }
    // token logic here.
    const accessToken = await this.jwtService.signAsync(
      {
        sub: found.id,
        // TODO permissions or permissionIDs
      },
      {
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    return { accessToken };
  }
}
