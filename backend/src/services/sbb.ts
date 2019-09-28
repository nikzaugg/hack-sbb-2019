import axios from 'axios'
import { SBB_ACCESS_TOKEN_API, SBB_API } from '../constants'
import { minBy, maxBy } from 'lodash'
import { exists } from 'fs'
const uuidv4 = require('uuid/v4')

const demoUser = require('../../data/users.json')
const locations = require('../../data/sbb.json')

require('dotenv').config()

interface ISbbToken {
  token: string
  expiry: number
  conversationId: string
}

interface ISbbTokenResponse {
  data: {
    access_token: string
    expires_in: number
    session_state: string
  }
}

interface ISbbQueryResponse {
  // fix this => should be object and sometimes list
  data: any
}

interface ISbbDataPoint {
  Name: string
  Geopos: string
  ID: number
}

interface ISbbTrip {
  trip: any
}

let store = {
  token: null,
  expiry: null,
  conversationId: null,
}

async function getSbbAccessToken(): Promise<ISbbToken> {
  if (store.token == null || store.expiry < Date.now()) {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
      },
    }

    const data = {
      grant_type: 'client_credentials',
      client_id: process.env.SBB_CLIENT_ID,
      client_secret: process.env.SBB_CLIENT_SECRET,
    }

    const encodeForm = data => {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]),
        )
        .join('&')
    }

    try {
      const response: ISbbTokenResponse = await axios.post(
        SBB_ACCESS_TOKEN_API,
        encodeForm(data),
        config,
      )

      store = {
        token: response.data.access_token,
        expiry: Date.now() + response.data.expires_in * 1000,
        conversationId: uuidv4(),
      }

      return store
    } catch (error) {
      console.log(error)
      throw Error('no auth token set')
    }
  }
  return store
}

async function getSbbLocationFromAPI(location: string) {
  const headers = {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    'X-Contract-Id': process.env.SBB_CONTRACT_ID,
    'X-Conversation-Id': store.conversationId,
    Authorization: `Bearer ${store.token}`,
    Host: 'b2p-int.api.sbb.ch',
    'Accept-Encoding': 'gzip, deflate',
    Connection: 'keep-alive',
  }

  try {
    const response: ISbbQueryResponse = await axios.get(
      `${SBB_API}/locations?name=${location}`,
      {
        headers: headers,
      },
    )

    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

function getLocationNames() {
  const locationMap = new Map()
  locations.forEach(location => {
    locationMap.set(location.Name, {
      id: location.ID,
      name: location.Name,
      lat: location.Geopos.split(',')[0],
      lng: location.Geopos.split(',')[1],
    })
  })
  return locationMap
}

function getSbbLocation(name: string): ISbbDataPoint[] {
  return locations.filter(place => place.Name === name)
}

async function getBestPrices(
  originId: number,
  destId: number,
  travelDate: any,
  travelTimes: string[],
  maxPrice: number,
  withHalfFare: boolean,
): Promise<any> {
  // The passengers id, age and reduction {none, half-fare, ga-1st, ga-2nd, bc25, bc50, bc100, rail-plus}
  const passenger = withHalfFare ? 'paxa;42;half-fare' : 'paxa;42;none'

  let trips = await Promise.all(
    travelTimes.map(async time => {
      return getSbbTrips(originId, destId, travelDate, time)
    }),
  )

  trips = trips.flatMap(trip => trip)

  let prices = await getSbbPrices(trips, passenger)

  if (prices.length == 0) {
    console.log(`for ${destId} there is no price`)
    return null
  }

  prices = prices.flatMap(trip => {
    if (maxPrice < trip.price / 100) {
      return []
    }
    return {
      tripId: trip.tripId,
      price: trip.price,
      class: trip.qualityOfService,
    }
  })

  const firstClass = prices.filter(trip => trip.class == 1)
  const secondClass = prices.filter(trip => trip.class == 2)

  const firstMin = minBy(firstClass, trip => trip.price)
  const secondMin = minBy(secondClass, trip => trip.price)

  const min =
    firstMin.price > secondMin.price
      ? { class: secondMin.class, trip: secondMin, prices: secondClass }
      : { class: firstMin.class, trip: firstMin, prices: firstClass }
  const max = maxBy(min.prices, trip => trip.price)
  const discount = (1 - min.trip.price / max.price) * 100
  console.log(
    `OriginId: ${originId}, DestId: ${destId}, Price: ${min.trip.price}, Max: ${max.price}, Discount: ${discount}%`,
  )
  return {
    originId: originId,
    destId: destId,
    price: min.trip.price,
    class: min.class,
    tripId: min.trip.tripId,
    discount: discount,
  }
}

async function getSbbTrips(
  originId: number,
  destinationId: number,
  date: string,
  time: string,
): Promise<ISbbQueryResponse> {
  const headers = {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    'X-Contract-Id': process.env.SBB_CONTRACT_ID,
    'X-Conversation-Id': store.conversationId,
    Authorization: `Bearer ${store.token}`,
    Host: 'b2p-int.api.sbb.ch',
    'Accept-Encoding': 'gzip, deflate',
    Connection: 'keep-alive',
  }

  try {
    const response: ISbbQueryResponse = await axios.get(`${SBB_API}/trips`, {
      headers: headers,
      params: {
        originId: originId,
        destinationId: destinationId,
        date: date,
        time: time,
      },
    })

    return response.data.map(trip => ({
      tripId: trip.tripId,
      segments: trip.segments,
    }))
  } catch (error) {
    // console.log(error)
    throw Error(
      `could not find trips for origin: ${originId} and destination: ${destinationId}`,
    )
  }
}

async function getSbbPrices(
  tripIds: any[],
  passengers: string,
): Promise<any[]> {
  let result = []
  for (let trip of tripIds) {
    try {
      const response = await getSbbPriceOfTicket(trip.tripId, passengers)
      const prices = response.data.filter(price => price.superSaver === true)
      result.push(...prices)
    } catch (error) {
      // console.log(error)
      // throw Error("couldn't get price")
      return []
    }
  }
  return result
}

async function getSbbPriceOfTicket(
  tripId: string,
  passengers: string,
): Promise<ISbbQueryResponse> {
  const headers = {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    'X-Contract-Id': process.env.SBB_CONTRACT_ID,
    'X-Conversation-Id': store.conversationId,
    Authorization: `Bearer ${store.token}`,
    Host: 'b2p-int.api.sbb.ch',
    'Accept-Encoding': 'gzip, deflate',
    Connection: 'keep-alive',
  }

  try {
    const response: ISbbQueryResponse = await axios.get(
      `${SBB_API}/v2/prices`,
      {
        headers: headers,
        params: {
          tripIds: tripId,
          passengers: passengers,
        },
      },
    )
    return response
  } catch (error) {
    console.log(error.response)
    throw Error('no price response for request')
  }
}

async function getSbbOffersForTrip(
  accessToken: string,
  conversationId: string,
  tripId: string,
  passengers: string,
): Promise<ISbbQueryResponse> {
  const headers = {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    'X-Contract-Id': process.env.SBB_CONTRACT_ID,
    'X-Conversation-Id': conversationId,
    Authorization: `Bearer ${accessToken}`,
    Host: 'b2p-int.api.sbb.ch',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en',
    Connection: 'keep-alive',
  }

  try {
    const response: ISbbQueryResponse = await axios.get(
      `${SBB_API}/trip-offers`,
      {
        headers: headers,
        params: {
          tripId: tripId,
          passengers: passengers,
        },
      },
    )

    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

async function prebookSbbTicket(
  accessToken: string,
  conversationId: string,
  offerId: string,
): Promise<ISbbQueryResponse> {
  const headers = {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    'X-Contract-Id': process.env.SBB_CONTRACT_ID,
    'X-Conversation-Id': conversationId,
    Authorization: `Bearer ${accessToken}`,
    Host: 'b2p-int.api.sbb.ch',
    'Accept-Encoding': 'gzip, deflate',
    Connection: 'keep-alive',
  }

  const data = [
    {
      offerPrebookings: [{ offerId }],
      passenger: demoUser,
    },
  ]

  try {
    const response: ISbbQueryResponse = await axios.post(
      `${SBB_API}/v2/prebookings`,
      data,
      {
        headers: headers,
      },
    )

    return response
  } catch (error) {
    console.log(error.response)
    return null
  }
}

export {
  getLocationNames,
  getSbbPriceOfTicket,
  getSbbAccessToken,
  getSbbTrips,
  getSbbLocation,
  getSbbLocationFromAPI,
  getSbbPrices,
  getSbbOffersForTrip,
  prebookSbbTicket,
  getBestPrices,
}
