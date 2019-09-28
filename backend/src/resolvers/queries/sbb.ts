import { Context } from '../../interfaces'
import { getAccessToken } from '../../services/sbb'

async function getToken(_, args, ctx: Context) {
  const tokenData = await getAccessToken()
  console.log(ctx.request)
  return null
}

export { getToken }
