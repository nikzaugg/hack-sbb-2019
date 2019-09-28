import * as auth from './mutations/auth'
import * as sbb from './queries/sbb'

export default {
  Mutation: {
    ...auth,
  },
  Query: {
    ...sbb,
  },
}
