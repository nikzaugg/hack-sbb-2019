import axios from 'axios'
import _sortBy from 'lodash/sortBy'

import { SYGIC_API_ENDPOINT } from '../constants'

interface PlaceResult {}

interface DestinationResult {}

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

/**
 * Get metadata of a single place
 */
export async function getPlaceMeta({ placeId }: { placeId: String }) {
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
 * Get places matching a list of categories
 */
export async function getMatchingPlaces({
  categories,
}: {
  categories?: String
}): Promise<PlaceResult[]> {
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
        // get only the top 5%
        rating: '0.25:',
      },
      headers: { 'x-api-key': process.env.API_KEY_SYGIC },
    })

    const { places } = response.data.data
    console.log(places)

    const weightedPlaces = new Map()
    places.forEach(place => {
      const key = place.name_suffix.replace(', Switzerland', '')
      if (weightedPlaces.has(key)) {
        const prev = weightedPlaces.get(key)
        const ratingSum = prev.ratingSum + place.rating
        const count = prev.count + 1
        const ratingAvg = ratingSum / count

        weightedPlaces.set(key, {
          ...prev,
          activities: [...prev.activities, place.id],
          count,
          ratingSum,
          ratingAvg,
          score: 0.25 * count + 0.75 * ratingAvg,
        })
      } else {
        weightedPlaces.set(key, {
          activities: [place.id],
          count: 1,
          ratingSum: place.rating,
          ratingAvg: place.rating,
          score: 0.25 + 0.75 * place.rating,
        })
      }
    })

    const scoredPlaces = _sortBy(weightedPlaces.values(), place => place.score)
    console.log(scoredPlaces)

    // const activities = response.data.data.places.reduce((acc, place) => {
    //   if (place.id.includes('city')) {
    //     return {
    //       ...acc,
    //       [place.id]: acc[place.id] ? [...acc[place.id], place.id] : [place.id],
    //     }
    //   }

    //   return {
    //     ...acc,
    //     [place.id]: acc[place.id]
    //       ? [
    //           ...acc[place.id],
    //           ...place.parent_ids.filter(el => el.includes('city')),
    //         ]
    //       : place.parent_ids.filter(el => el.includes('city')),
    //   }
    // }, {})

    // filter out cities
    // const cities = response.data.data.places.filter(place =>
    //   place.id.includes('city'),
    // )

    //console.log(activities)
  } catch (e) {
    console.error(e)
  }

  return []
}

export async function computeDestinationRanking({
  categories,
  destinations,
}: {
  categories?: String[]
  destinations: String[]
}): Promise<DestinationResult[]> {
  console.log(destinations)

  try {
    const response = await axios.get(
      `${SYGIC_API_ENDPOINT}/trips/templates?parent_place_id=country:19`,
      { headers: { 'x-api-key': process.env.API_KEY_SYGIC } },
    )

    console.log(response.data)
  } catch (e) {
    console.error(e)
  }

  return []
}
