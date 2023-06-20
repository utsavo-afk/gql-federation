import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/models/user.model';
import { SignupInput } from './dto/sign-up.input';
import { SigninInput } from './dto/sign-in.input';
import { MongoErrorCodes } from 'libs/common/utils/mongoErrorCodes.util';
import { GraphQLError } from 'graphql';
import { HttpStatus } from '@nestjs/common';
import { SigninResponse } from './dto/sign-in.response';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'signup' })
  async signup(@Args('singupInput') signupInput: SignupInput) {
    try {
      const response = await this.authService.signUp(signupInput);
      return response;
    } catch (error) {
      if (error.code === MongoErrorCodes.UNIQUE_VALIDATION) {
        throw new GraphQLError('User already exists', {
          extensions: {
            code: HttpStatus.CONFLICT,
          },
        });
      }
    }
  }

  @Mutation(() => SigninResponse, { name: 'signin' })
  async signin(@Args('signinInput') signinInput: SigninInput) {
    try {
      const response = await this.authService.signIn(signinInput);
      return response;
    } catch (error) {
      throw new GraphQLError(`${error.response.message}`, {
        extensions: {
          code: error.response.statusCode,
          error: error.response.error,
        },
      });
    }
  }
}
