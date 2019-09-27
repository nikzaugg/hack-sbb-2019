import { Client } from 'faunadb'

export interface Context {
  fauna: Client
  request: any
  query: any
}

export interface User {
  id: String
  name: String
  email: String
  password?: String
}
