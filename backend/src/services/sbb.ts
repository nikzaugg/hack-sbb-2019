import axios from 'axios'
import { SBB_ACCESS_TOKEN_API, SBB_API } from '../constants'

const locations = require('../../data/sbb.json')

require('dotenv').config()

interface ISbbToken {
  token: string
  tokenExpiry: number
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

async function getSbbAccessToken(): Promise<ISbbToken> {
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
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  try {
    const response: ISbbTokenResponse = await axios.post(
      SBB_ACCESS_TOKEN_API,
      encodeForm(data),
      config,
    )
    return {
      token: response.data.access_token,
      tokenExpiry: Date.now() + response.data.expires_in * 1000,
      conversationId: response.data.session_state,
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

async function getSbbLocationFromAPI(
  accessToken: string,
  conversationId: string,
  location: string,
) {
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
  return new Set(locations.map(location => location.Name))
}

function getSbbLocation(name: string): ISbbDataPoint[] {
  return locations.filter(place => place.Name === name)
}

async function getSbbTrips(
  accessToken: string,
  conversationId: string,
  originId: number,
  destinationId: number,
  date: Date,
  time: string,
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

  try {
    const response: ISbbQueryResponse = await axios.get(`${SBB_API}/trips`, {
      headers: headers,
      params: {
        originId: originId,
        destinationId: destinationId,
        date: '2019-09-30',
        time: '13:30',
      },
    })

    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

async function getSbbPrices(
  accessToken: string,
  conversationId: string,
  tripIds: string,
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
    Connection: 'keep-alive',
  }

  try {
    const response: ISbbQueryResponse = await axios.get(
      `${SBB_API}/v2/prices`,
      {
        headers: headers,
        params: {
          tripIds: tripIds,
          passengers: passengers,
        },
      },
    )

    return response
  } catch (error) {
    console.log(error.response)
    return null
  }
}

export { getLocationNames, getSbbPrices, getSbbAccessToken, getSbbTrips, getSbbLocation, getSbbLocationFromAPI }