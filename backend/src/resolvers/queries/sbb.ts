import { Context } from '../../interfaces'
import { getAccessToken } from '../../services/sbb'

async function getToken(_, args, ctx: Context) {
  const tokenData = await getAccessToken()
  return null
}

export { getToken }
