import { InputType } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  username: string;
  email: string;
  password: string;
}
