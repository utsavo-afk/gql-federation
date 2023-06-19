import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema()
export class User {
  @Field(() => String, { description: 'mongoose document ObjectID' })
  id: string;

  @Prop({ trim: true })
  username: string;

  @Prop({ trim: true, unique: true })
  email: string;

  @Prop({ trim: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
