import * as auth from './mutations/auth'
import * as sbb from './queries/sbb'
import * as places from './queries/places'

export default {
  Mutation: {
    ...auth,
  },
  Query: {
    ...sbb,
    ...places,
  },
}
