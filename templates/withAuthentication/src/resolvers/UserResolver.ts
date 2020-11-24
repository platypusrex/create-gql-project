import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entities/User';
import { RegisterInput } from '../inputs/RegisterInput';
import { LoginInput } from '../inputs/LoginInput';
import { Context } from '../types/context';
import { hashPassword, validatePassword } from '../utils/authUtils';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    const userId = ctx.req.session?.userId;
    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);
    if (!user) {
      return null;
    }

    return user;
  }

  @Mutation(() => User)
  async register(@Arg('input') { password, ...rest }: RegisterInput): Promise<User> {
    const hashedPassword = await hashPassword(password);
    return await User.create({
      password: hashedPassword,
      ...rest,
    }).save();
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('input') { email, password }: LoginInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const passwordValid = await validatePassword(password, user.password);
    if (!passwordValid) {
      return null;
    }

    ctx.req.session.userId = user.id;
    return user;
  }
}
