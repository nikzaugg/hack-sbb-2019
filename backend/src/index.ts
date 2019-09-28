import { GraphQLServer } from 'graphql-yoga'
import { query, Client } from 'faunadb'

import * as SygicService from './services/sygic'
import resolvers from './resolvers'
const DATA = require('../data/data.json')
const CH_COLLECTION = require('../data/ch_collection.json')

import { getLocationFromAPI, getAccessToken, getLocation } from './services/sbb'

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

// const tokens = getAccessToken()
// tokens.then(result => {
//   console.log(Date.now(), result.tokenExpiry, result.tokenExpiry > Date.now())

//   const response = getLocationFromAPI(result.token, result.conversationId, "Bern")
//   response.then(result => {
//     console.log(result.data)
//   })
// })

// const places = getLocation("Horgen")
// const placeID = places.length != 0 ? places[0].ID : null;
// console.log("horgen:", placeID)
// SygicService.getPlaceMeta({ placeId: CH_COLLECTION[0].place_ids[0] })
SygicService.getMatchingPlaces({ categories: 'hiking' })
// SygicService.computeDestinationRanking({ destinations: ['Zurich'] })

server.start(() => console.log(`Server is running on http://localhost:4000`))
