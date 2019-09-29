import axios from 'axios'
import { SBB_ACCESS_TOKEN_API, SBB_API } from '../constants'
import { minBy, maxBy } from 'lodash'
import _flatten from 'lodash/flatten'
const uuidv4 = require('uuid/v4')

const demoUser = require('../../data/users.json')
const locations = require('../../data/sbb_en.json')

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
  tripId: string
  segments: any[]
}

let store = {
  token: null,
  expiry: null,
  conversationId: null,
}

let HEADERS

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

      HEADERS = {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'X-Contract-Id': process.env.SBB_CONTRACT_ID,
        'X-Conversation-Id': store.conversationId,
        Authorization: `Bearer ${store.token}`,
        Host: 'b2p-int.api.sbb.ch',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en',
        Connection: 'keep-alive',
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
  try {
    const response: ISbbQueryResponse = await axios.get(
      `${SBB_API}/locations?name=${location}`,
      { headers: HEADERS },
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
      return await getSbbTrips(originId, destId, travelDate, time)
    }),
  )

  const flattendTrips = _flatten(trips)

  let ids = new Set()

  const uniqueTrips = flattendTrips.filter(trip => {
    if (ids.has(trip.tripId)) {
      console.log("duplicate you fucker!")
      return false
    }
    ids.add(trip.tripId)
    return true
  })

  let prices = await getSbbPrices(uniqueTrips, passenger)

  if (prices.length == 0) {
    console.log(`for ${destId} there is no price`)
    return []
  }

  prices = _flatten(
    prices.map(trip => {
      if (maxPrice < trip.price / 100) {
        return []
      }
      return trip
    }),
  )

  const firstClass = prices.filter(trip => trip.class == 1)
  const secondClass = prices.filter(trip => trip.class == 2)

  const firstMin = minBy(firstClass, trip => trip.price)
  const secondMin = minBy(secondClass, trip => trip.price)

  let min
  if (!firstMin && !secondMin) {
    return []
  }

  if (!firstMin) {
    min = { class: secondMin.class, trip: secondMin, prices: secondClass }
  } else if (!secondMin) {
    min = { class: firstMin.class, trip: firstMin, prices: firstClass }
  } else {
    min =
      firstMin.price > secondMin.price
        ? { class: secondMin.class, trip: secondMin, prices: secondClass }
        : { class: firstMin.class, trip: firstMin, prices: firstClass }
  }

  const max = maxBy(min.prices, trip => trip.price)
  const discount = (1 - min.trip.price / max.price) * 100
  // console.log(
  //   `OriginId: ${originId}, DestId: ${destId}, Price: ${min.trip.price}, Max: ${max.price}, Discount: ${discount}%, SuperSaver: ${min.trip.superSaver}`,
  // )
  return {
    originId,
    destId,
    discount,
    price: min.trip.price,
    class: min.class,
    tripId: min.trip.tripId,
    superSaver: min.trip.superSaver,
    segments: min.trip.segments,
  }
}

async function getSbbTrips(
  originId: number,
  destinationId: number,
  date: string,
  time: string,
): Promise<ISbbTrip[]> {
  try {
    const response: ISbbQueryResponse = await axios.get(`${SBB_API}/trips`, {
      headers: HEADERS,
      params: {
        originId: originId,
        destinationId: destinationId,
        date: date,
        time: time,
      },
    })

    const data = response.data.map(trip => ({
      tripId: trip.tripId,
      segments: trip.segments.map(segment => ({
        origin: {
          name: segment.origin.name,
          time: segment.origin.time,
          track: parseInt(segment.origin.track),
        },
        destination: {
          name: segment.destination.name,
          time: segment.destination.time,
          track: parseInt(segment.destination.track),
        },
      }))
    }))

    return [data[0], data[1]]

    // if (time === "06:00" || time === "19:00") {
    //   return [data[0], data[3]]
    // } else if (time === "07:00" || time === "20:00") {
    //   const trip1 = data[4] !== undefined ? data[4] : []
    //   return [data[1], trip1]
    // } else {
    //   const trip2 = data[5] !== undefined ? data[5] : []
    //   return [data[2], trip2]
    // }

  } catch (error) {
    console.log(
      `could not find trips for origin: ${originId} and destination: ${destinationId}`,
    )
    return []
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
      const filtered = response.data.map(priceResult => ({
        tripId: trip.tripId,
        price: priceResult.price,
        class: priceResult.qualityOfService,
        superSaver: priceResult.superSaver,
        segments: trip.segments,
      }))

      result.push(...filtered)
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
  try {
    const response: ISbbQueryResponse = await axios.get(
      `${SBB_API}/v2/prices`,
      {
        headers: HEADERS,
        params: {
          tripIds: tripId,
          passengers: passengers,
        },
      },
    )
    return response
  } catch (error) {
    // console.log(error.response)
    throw Error('no price response for request')
  }
}

async function getSbbOffersForTrip(
  tripId: string,
  passengers: string,
): Promise<ISbbQueryResponse> {
  try {
    const response: ISbbQueryResponse = await axios.get(
      `${SBB_API}/trip-offers`,
      {
        headers: HEADERS,
        params: {
          tripId: tripId,
          passengers: passengers,
        },
      },
    )
    return response
  } catch (error) {
    console.log(error.response)
    throw Error(`no offer for trip ${tripId}`)
  }
}

async function prebookSbbTicket(offerId: string): Promise<ISbbQueryResponse> {
  const data = [
    {
      offerPrebookings: [{ offerId }],
      passenger: demoUser,
    },
  ]
  try {
    return await axios.post(`${SBB_API}/v2/prebookings`, data, {
      headers: HEADERS,
    })
  } catch (error) {
    console.log(error.response)
    throw Error(`could not prebook ticket for offer with id: ${offerId}`)
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
