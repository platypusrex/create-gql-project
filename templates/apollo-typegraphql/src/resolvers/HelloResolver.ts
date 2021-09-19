import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Context } from '../types/context';
import { HelloInput } from '../inputs/HelloInput';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async hello(
    @Arg('input', { nullable: true }) input: HelloInput,
    @Ctx() ctx: Context
  ): Promise<string> {
    console.log('context', ctx.req.baseUrl);
    const { birthdate, name } = input || {};
    let message = '';
    if (birthdate) {
      const { month, day, year } = birthdate;
      const birthDay = new Date(`${month}/${day}/${year}`);
      const today = new Date();
      const daysAlive = Math.ceil((today.getTime() - birthDay.getTime()) / (1000 * 3600 * 24));
      message = ` You are ${daysAlive} days old!`;
    }
    return `Hello ${name || 'world'}!${message}`;
  }
}
