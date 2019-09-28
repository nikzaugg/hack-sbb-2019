import * as SygicService from './sygic'
import * as SBBService from './sbb'
import { minBy, maxBy } from 'lodash'
import _flatten from 'lodash/flatten'
import dayjs from 'dayjs'
const util = require('util')

async function getSurpriseTrips({
  originId,
  travelDate,
  maxPrice,
  withHalfFare,
  categories,
}) {
  const formattedDate = dayjs(travelDate).format('YYYY-MM-DD')

  const matchingPlaces = await SygicService.getMatchingPlaces({
    categories: categories.join('|'),
  })

  const reachablePlaces = matchingPlaces
    .filter(place => place.isReachable && place.id !== originId)
    .slice(0, 5)

  // get the access token
  await SBBService.getSbbAccessToken()

  // query the top 10 places for trips
  const result = await Promise.all(
    reachablePlaces.map(async place => {
      // get the best outgoing trip
      const bestOut = await SBBService.getBestPrices(
        originId,
        place.id,
        formattedDate,
        ['06:00', '07:00', '08:00'],
        maxPrice,
        withHalfFare,
      )
      const remainingMoney = maxPrice - bestOut.price / 100

      if (bestOut.length === 0 || !bestOut.superSaver || remainingMoney <= 0) {
        return []
      }

      // get the best return trip
      const bestReturn = await SBBService.getBestPrices(
        place.id,
        originId,
        formattedDate,
        ['19:00', '20:00', '21:00'],
        remainingMoney,
        withHalfFare,
      )

      if (bestReturn.length === 0 || !bestReturn.superSaver) {
        return []
      }

      const originName = bestOut.segments[0].origin.name
      const startTime = bestOut.segments[0].origin.time
      const destName =
        bestOut.segments[bestOut.segments.length - 1].destination.name
      const endTime =
        bestReturn.segments[bestReturn.segments.length - 1].destination.time
      console.log(
        `Start Place: ${originName}, Start Time: ${startTime}, Destination ${destName}, End Time: ${endTime}`,
      )

      return {
        bestOut: {
          ...bestOut,
          id: bestOut.tripId,
        },
        bestReturn: {
          ...bestReturn,
          id: bestReturn.tripId
        },
        categories: place.categories,
        price: bestOut.price + bestReturn.price,
        discount: (bestOut.discount + bestReturn.discount) / 2,
        start: startTime,
        end: endTime,
      }
    }),
  )

  return _flatten(result)
}

export { getSurpriseTrips }
