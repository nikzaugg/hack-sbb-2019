import axios from 'axios'
import _sortBy from 'lodash/sortBy'

import { getLocationNames } from './sbb'
import { SYGIC_API_ENDPOINT } from '../constants'

interface PlaceResult {
  categories: String[]
  isReachable: Boolean
}

interface DestinationResult {}

/**
 * Score a place based on the count of activities and the average rating
 */
function computeScore({
  count,
  ratingAvg,
  ratingSum,
  distance,
}: {
  count: number
  ratingAvg: number
  ratingSum: number
  distance?: number
}) {
  return 0.001 * count + 0.5 * ratingAvg + 0.5 * ratingSum
}

function computeCategoryFrequencies(categoryArray) {
  return categoryArray.reduce((acc, category) => {
    if (typeof acc[category] == 'undefined') {
      return {
        ...acc,
        [category]: 1,
      }
    }

    return {
      ...acc,
      [category]: acc[category] + 1,
    }
  }, {})
}

/**
 * Get metadata of a single place
 */
async function getPlaceMeta({ placeId }: { placeId: String }) {
  try {
    const response = await axios.get(
      `${SYGIC_API_ENDPOINT}/places/${placeId}`,
      { headers: { 'x-api-key': process.env.API_KEY_SYGIC } },
    )
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}

/**
 * Get places matching a list of categories and sorted by score
 */
async function getMatchingPlaces({
  categories,
  origin,
}: {
  categories?: String
  origin?: String
}): Promise<PlaceResult[]> {
  // TODO: include the distance to the destinations for weighting and filtering

  try {
    // get all matching places in switzerland
    const response = await axios.get(`${SYGIC_API_ENDPOINT}/places/list`, {
      params: {
        // only cities in switzerland
        parents: 'country:19',
        // only city or town objects
        // level: 'city|town',
        // increase the number of results (default: 10, max: 1024)
        limit: 1024,
        // filter matching categories
        categories,
        // get only the top rated (0.01=top 5%, ...)
        rating: '0.001:',
      },
      headers: { 'x-api-key': process.env.API_KEY_SYGIC },
    })

    // get the location names available (sbb)
    const availableLocations = getLocationNames()

    // reduce returned places to a keyed map
    const weightedPlaces = new Map()
    response.data.data.places.forEach(place => {
      // remove the unnecessary suffix
      const key = place.name_suffix.replace(', Switzerland', '')

      if (weightedPlaces.has(key)) {
        const prev = weightedPlaces.get(key)
        const ratingSum = prev.ratingSum + place.rating
        const count = prev.count + 1

        weightedPlaces.set(key, {
          activities: [...prev.activities, place],
          categories: [...prev.categories, ...place.categories],
          count,
          name: key,
          ratingSum,
        })
      } else {
        weightedPlaces.set(key, {
          activities: [place],
          categories: place.categories,
          count: 1,
          name: key,
          ratingSum: place.rating,
        })
      }
    })
    // console.log('weighted', weightedPlaces)

    // filter all places to only the reachable ones with sbb
    const reachablePlaces = await Promise.all(
      Array.from(weightedPlaces.values()).map(async place => {
        const isReachable = availableLocations.has(place.name)
        const ratingAvg = place.ratingSum / place.count

        // TODO: get alternative handle for non-matching destinations
        // // if the location is not reachable, try to get an alternative handle for it
        // if (!isReachable) {
        //   const response = await axios.post(
        //     `${SYGIC_API_ENDPOINT}/places/match`,
        //     {
        //       names: [{ name: place.name, language_id: null }],
        //       location: null,
        //       ids: [],
        //       tags: [],
        //       level: null,
        //     },
        //     {
        //       headers: { 'x-api-key': process.env.API_KEY_SYGIC },
        //     },
        //   )

        //   console.log('unreachable', place.name, response.data)
        // }

        return {
          ...place,
          id: isReachable ? availableLocations.get(place.name).id : null,
          categories: computeCategoryFrequencies(place.categories),
          score: computeScore({
            count: place.count,
            ratingSum: place.ratingSum,
            ratingAvg,
          }),
          ratingAvg,
          isReachable,
        }
      }),
    )
    // console.log('reachable', reachablePlaces)

    // sort all places in the weighted map by their score
    const sortedPlaces = _sortBy(reachablePlaces, place => -place.score)
    // console.log('sorted', sortedPlaces)

    return sortedPlaces
  } catch (e) {
    console.error(e)
  }

  return []
}

async function getPlaceItineraries({ placeName }: { placeName: String }) {
  // match the name of the place with a sygic entity
  try {
    const response = await axios.post(
      `${SYGIC_API_ENDPOINT}/places/match`,
      {
        names: [{ name: placeName, language_id: 'en' }],
        ids: [],
        tags: [],
        location: null,
        level: null,
      },
      {
        headers: { 'x-api-key': process.env.API_KEY_SYGIC },
      },
    )

    console.log(response.data)
  } catch (e) {
    console.error(e)
  }

  // TODO: extract the best match for the entity

  // fetch trip templates for the sygic entity related to the place
  try {
    const response = await axios.get(
      `${SYGIC_API_ENDPOINT}/trips/templates?parent_place_id=country:19`,
      { headers: { 'x-api-key': process.env.API_KEY_SYGIC } },
    )

    console.log(response.data)
  } catch (e) {
    console.error(e)
  }

  return null
}

export { getMatchingPlaces, getPlaceMeta, getPlaceItineraries }

// export async function computeDestinationRanking({
//   categories,
//   destinations,
// }: {
//   categories?: String[]
//   destinations: String[]
// }): Promise<DestinationResult[]> {
//   console.log(destinations)

//   try {
//     const response = await axios.get(
//       `${SYGIC_API_ENDPOINT}/trips/templates?parent_place_id=country:19`,
//       { headers: { 'x-api-key': process.env.API_KEY_SYGIC } },
//     )

//     console.log(response.data)
//   } catch (e) {
//     console.error(e)
//   }

//   return []
// }

// const response = await axios.post(
//   `${SYGIC_API_ENDPOINT}/places/match`,
//   {
//     names: names.map(name => ({
//       name,
//       language_id: null,
//     })),
//     location: null,
//     ids: [],
//     tags: [],
//     level: null,
//   },
//   {
//     headers: {
//       'x-api-key': process.env.API_KEY_SYGIC,
//     },
//   },
// )
