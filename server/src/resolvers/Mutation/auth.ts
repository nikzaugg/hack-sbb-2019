import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { Context } from '../../utils'

export const auth = {
  async signup(parent, { name, email, pwd }, ctx: Context) {
    const password = await bcrypt.hash(pwd, 10)
    const user = await ctx.fauna.query(
      ctx.query.Create(
        ctx.query.Collection("posts"),
        { data: { name: name, email: email, password: password } }));
    console.log(user)

    return { token: jwt.sign({ userId: 2 }, process.env.APP_SECRET), user }
  },

  // async login(parent, { email, password }, ctx: Context) {
  //   // TODO: replace with faunadb
  //   const user = await ctx.fauna.user({ email })
  //   if (!user) {
  //     throw new Error(`No such user found for email: ${email}`)
  //   }

  //   const valid = await bcrypt.compare(password, user.password)
  //   if (!valid) {
  //     throw new Error('Invalid password')
  //   }

  //   return {
  //     token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
  //     user,
  //   }
  // },
}
