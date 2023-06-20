import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { MongoErrorCodes } from 'libs/common/utils/mongoErrorCodes.util';
import { GraphQLError } from 'graphql';
import { HttpStatus } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'createUser' })
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      const response = await this.usersService.create(createUserInput);
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

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findById(@Args('id', { type: () => String }) id: string) {
    try {
      const response = await this.usersService.findById(id);
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

  @Mutation(() => User, { name: 'updateUser' })
  async update(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async remove(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }
}
