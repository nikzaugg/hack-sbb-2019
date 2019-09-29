import * as SygicService from './sygic'
import * as SBBService from './sbb'
import { minBy, maxBy } from 'lodash'
import _flatten from 'lodash/flatten'
import dayjs from 'dayjs'

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
        ['06:00', '07:30', '09:00'],
        maxPrice,
        withHalfFare,
      )
      const remainingMoney = maxPrice - bestOut.price / 100

      if (bestOut.length === 0 || !bestOut.superSaver || remainingMoney <= (maxPrice * 0.25)) {
        return []
      }

      // get the best return trip
      const bestReturn = await SBBService.getBestPrices(
        place.id,
        originId,
        formattedDate,
        ['18:00', '19:30', '21:00'],
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
      const totalPrice = bestOut.price + bestReturn.price
      const discount = (bestOut.discount + bestReturn.discount) / 2;

      console.log(
        `Start Place: ${originName}, Start Time: ${startTime}, Destination ${destName}, End Time: ${endTime}, Price: ${bestOut.price + bestReturn.price}, Discount: ${discount}`,
      )

      return {
        bestOut: {
          ...bestOut,
          id: bestOut.tripId,
        },
        bestReturn: {
          ...bestReturn,
          id: bestReturn.tripId,
        },
        categories: place.categories,
        price: totalPrice,
        discount: discount,
        start: startTime,
        end: endTime,
      }
    }),
  )

  return _flatten(result)
}

export { getSurpriseTrips }
