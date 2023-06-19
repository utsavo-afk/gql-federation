import { InputType } from '@nestjs/graphql';

@InputType()
export class SigninInput {
  email: string;
  password: string;
}
