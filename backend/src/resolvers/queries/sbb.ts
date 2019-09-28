import { Context } from '../../interfaces'
import {
  prebookSbbTicket,
  getSbbLocationFromAPI,
  getSbbAccessToken,
  getSbbLocation,
  getSbbPrices,
  getSbbTrips,
  getSbbPriceOfTicket,
  getSbbOffersForTrip,
} from '../../services/sbb'

const uuidv4 = require('uuid/v4')

let token = {
  token: null,
  expiry: null,
}

let conversationId = 'e57529d7-6db6-404c-8e43-859d736be05d'
let theTrip

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
  theTrip = tripIds

  // const response = getSbbLocationFromAPI(result.token, result.conversationId, "Bern")
  // response.then(result => { console.log(result.data) })

  // const places = getSbbLocation("Horgen")
  // const placeID = places.length != 0 ? places[0].ID : null;
  // console.log("horgen:", placeID)
  return null
}

async function getPrices(_, { args }, ctx: Context) {
  // The passengers id, age and reduction {none, half-fare, ga-1st, ga-2nd, bc25, bc50, bc100, rail-plus} -> default value: paxa;42;half-fare
  console.log('args:' + JSON.stringify(args))
  const passenger = 'paxa;42;half-fare'
  let priceResponse = await getSbbPrices(
    token.token,
    conversationId,
    theTrip,
    passenger,
  )
  priceResponse = priceResponse.map(trip => ({
    tripId: trip.tripId,
    price: trip.price,
    class: trip.qualityOfService,
    links: trip.links,
  }))
  priceResponse.forEach(trip => console.log(trip.price, trip.tripId))
  return null
}

async function getPriceOfTicket(_, { tripId, passengers }, ctx: Context) {
  // The passengers id, age and reduction {none, half-fare, ga-1st, ga-2nd, bc25, bc50, bc100, rail-plus} -> default value: paxa;42;half-fare
  console.log(tripId, passengers)
  const passenger = 'paxa;42;half-fare'

  const priceResults = await getSbbPriceOfTicket(
    token.token,
    conversationId,
    theTrip,
    passenger,
  )
  const prices = priceResults.data
  console.log(prices.filter(price => price.superSaver === true))
  return null
}

async function getOffersForTrip(_, { tripId, passengers }, ctx: Context) {
  // The passengers id, age and reduction {none, half-fare, ga-1st, ga-2nd, bc25, bc50, bc100, rail-plus} -> default value: paxa;42;half-fare
  console.log(tripId, passengers)
  const passenger = 'paxa;42;half-fare'

  const priceResults = await getSbbOffersForTrip(
    token.token,
    conversationId,
    tripId,
    passenger,
  )
  const filtered = priceResults.data.map(offer => ({
    id: offer.offers[0].offerId,
    title: offer.offers[0].title,
    price: offer.offers[0].price,
    class: offer.offers[0].qualityOfService,
  }))
  console.log(filtered)
  return null
}

async function prebookTicket(_, { offerId }, ctx: Context) {
  const prebookResponse = await prebookSbbTicket(
    token.token,
    conversationId,
    offerId,
  )
  console.log(prebookResponse.data)
  return null
}

export {
  getToken,
  getTrips,
  getPriceOfTicket,
  getPrices,
  getOffersForTrip,
  prebookTicket,
}
