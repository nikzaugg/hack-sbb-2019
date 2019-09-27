import { GraphQLServer } from 'graphql-yoga'
import { query, Client } from "faunadb"
import resolvers from './resolvers'

require('dotenv').config()

const fauna = new Client({ secret: process.env.FAUNA_API_KEY });

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    fauna,
    query
  }),
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
