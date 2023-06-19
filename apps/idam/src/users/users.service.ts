import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = new this.usersModel(createUserInput);
    await user.save();
    return user;
  }

  findAll() {
    return this.usersModel.find();
  }

  async findById(id: string) {
    const found = await this.usersModel.findById(id);
    if (found) return found;
    throw new Error('User not found');
  }

  findByEmail(email: string) {
    return this.usersModel.findOne({ email });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.usersModel.findByIdAndUpdate(id, updateUserInput);
  }

  remove(id: string) {
    return this.usersModel.findByIdAndDelete(id);
  }
}
