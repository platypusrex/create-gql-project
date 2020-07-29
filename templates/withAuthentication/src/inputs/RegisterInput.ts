import { Field, InputType } from 'type-graphql';
import { IsEmail, Length, MinLength } from 'class-validator';
import { IsEmailUnique } from '../decorators/isEmailUnique';

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailUnique()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}
