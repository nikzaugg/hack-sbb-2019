import { auth } from './Mutation/auth'
// import { event } from './Mutation/event'
import { User } from './User'
// import { Event } from './Event'

export default {
  Mutation: {
    ...auth,
  },
  User
}
