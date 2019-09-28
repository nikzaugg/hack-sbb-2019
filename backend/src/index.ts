import { GraphQLServer } from 'graphql-yoga'
import { query, Client } from 'faunadb'

import * as SygicService from './services/sygic'
import resolvers from './resolvers'
const DATA = require('../data/data.json')
const CH_COLLECTION = require('../data/ch_collection.json')

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

// SygicService.getPlaceMeta({ placeId: CH_COLLECTION[0].place_ids[0] })
SygicService.getMatchingPlaces({ categories: 'hiking' })
// SygicService.computeDestinationRanking({ destinations: ['Zurich'] })

server.start(() => console.log(`Server is running on http://localhost:4000`))
