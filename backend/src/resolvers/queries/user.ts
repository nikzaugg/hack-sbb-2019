import { Context } from '../../interfaces'

async function getUserById(_, { id }, ctx: Context) {
  const result = await ctx.fauna.query(
    ctx.query.Get(ctx.query.Ref(ctx.query.Collection('User'), id)),
  )
  console.log(result)
  return result
}

export { getUserById }
