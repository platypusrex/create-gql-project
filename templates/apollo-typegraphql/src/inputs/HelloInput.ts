import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
class BirthdateInput {
  @Field()
  @Length(2, 2)
  month: string;

  @Field()
  @Length(2, 2)
  day: string;

  @Field()
  @Length(4, 4)
  year: string;
}

@InputType()
export class HelloInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  birthdate: BirthdateInput;
}
