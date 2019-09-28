import * as SygicService from './sygic'
import * as SBBService from './sbb'
import { minBy, maxBy } from 'lodash'
const util = require('util')

async function getSurpriseTrips({
  originId,
  travelDate,
  maxPrice,
  withHalfFare,
  categories,
}) {
  const matchingPlaces = await SygicService.getMatchingPlaces({
    categories: categories.join('|'),
  })
  const reachablePlaces = matchingPlaces
    .filter(place => place.isReachable)
    .slice(0, 5)
  reachablePlaces.forEach(place => console.log(place.name))

  // console.log(util.inspect(reachablePlaces[0], { showHidden: false, depth: null }))
  // console.log(reachablePlaces[0])

  // get trips for matching places from origin

  // get the access token
  await SBBService.getSbbAccessToken()

  // query the top 10 places for trips
  const result = await Promise.all(
    reachablePlaces.map(async place => {
      // TODO: what do we do if the result is null? check if trips null or no saver tickets => adjust time and retry the
      const bestPricePerTripObject = await SBBService.getBestPrices(
        originId,
        place.id,
        travelDate,
        ['06:00', '07:00', '08:00', '09:00'],
        maxPrice,
        withHalfFare,
      )

      if (!bestPricePerTripObject) {
        return []
      }

      // Get the best return trip
      const bestReturn = await SBBService.getBestPrices(
        place.id,
        originId,
        travelDate,
        ['18:00', '19:00', '20:00', '21:00'],
        maxPrice,
        withHalfFare,
      )

      return { firstTrip: bestPricePerTripObject, secondTrip: bestReturn }
    }),
  )

  return matchingPlaces
    .filter(place => place.isReachable)
    .slice(0, 10)
    .map(place => ({
      start: 1546325700,
      end: 1546371900,
      price: 10,
      discount: 65,
      categories: place.categories,
    }))
}

export { getSurpriseTrips }
