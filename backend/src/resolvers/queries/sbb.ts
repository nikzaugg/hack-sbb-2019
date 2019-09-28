import { Context } from '../../interfaces'
import {
  getSbbLocationFromAPI,
  getSbbAccessToken,
  getSbbLocation,
  getSbbTrips,
  getSbbPrices,
} from '../../services/sbb'

const uuidv4 = require('uuid/v4')

let token = {
  token: null,
  expiry: null,
}

let conversationId = 'e57529d7-6db6-404c-8e43-859d736be05d'
let theTrip = ''

async function getToken(_, args, ctx: Context) {
  console.log(Date.now(), token.expiry, token.expiry > Date.now())

  if (token.token == null || token.expiry < Date.now()) {
    const result = await getSbbAccessToken()
    token.token = result.token
    token.expiry = result.tokenExpiry
    conversationId = uuidv4()
  }
  console.log(token)

  return null
}

async function getTrips(
  _,
  { originId, destinationId, date, time },
  ctx: Context,
) {
  const trips = await getSbbTrips(
    token.token,
    conversationId,
    8505000,
    8509000,
    new Date(),
    '13:30',
  )
  const tripIds = trips.data
  console.log(tripIds)
  theTrip = tripIds[0].tripId

  // const response = getSbbLocationFromAPI(result.token, result.conversationId, "Bern")
  // response.then(result => { console.log(result.data) })

  // const places = getSbbLocation("Horgen")
  // const placeID = places.length != 0 ? places[0].ID : null;
  // console.log("horgen:", placeID)
  return null
}

async function getPrices(_, { tripIds, passengers }, ctx: Context) {
  // The passengers id, age and reduction {none, half-fare, ga-1st, ga-2nd, bc25, bc50, bc100, rail-plus} -> default value: paxa;42;half-fare
  const passenger = 'paxa;42;half-fare'
  const priceResults = await getSbbPrices(
    token.token,
    conversationId,
    theTrip,
    passenger,
  )
  const prices = priceResults.data
  console.log(
    'SuperSaver Tickets: ' + prices.filter(price => price.superSaver === true),
  )
  return null
}

export { getToken, getTrips, getPrices }
