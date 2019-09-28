import { GraphQLServer } from 'graphql-yoga'
import { query, Client } from 'faunadb'

import * as SygicService from './services/sygic'
import resolvers from './resolvers'
const DATA = require('../data/data.json')
import { SYGIC_API_ENDPOINT } from './constants'

require('dotenv').config()

const fauna = new Client({ secret: process.env.FAUNA_API_KEY })

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    fauna,
    query,
  }),
})

SygicService.getPlacesMetadata({ names: DATA.Zurich })
// SygicService.computeDestinationRanking({ destinations: ['Zurich'] })

server.start(() => console.log(`Server is running on http://localhost:4000`))
