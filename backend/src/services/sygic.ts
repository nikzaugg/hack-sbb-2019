import axios from 'axios'
import { SYGIC_API_ENDPOINT } from '../constants'

interface PlaceResult {}

interface DestinationResult {}

export async function getPlacesMetadata({
  names,
}: {
  names: String[]
}): Promise<PlaceResult[]> {
  console.log(names)

  try {
    const response = await axios.post(
      `${SYGIC_API_ENDPOINT}/places/match`,
      {
        names: names.map(name => ({
          name,
          language_id: null,
        })),
        location: null,
        ids: [],
        tags: [],
        level: null,
      },
      {
        headers: {
          'x-api-key': process.env.API_KEY_SYGIC,
        },
      },
    )

    // filter out cities
    const cities = response.data.data.filter(item => item.id.includes('city'))

    console.log(cities)
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
      {
        headers: {
          'x-api-key': process.env.API_KEY_SYGIC,
        },
      },
    )

    console.log(response.data)
  } catch (e) {
    console.error(e)
  }

  return []
}
