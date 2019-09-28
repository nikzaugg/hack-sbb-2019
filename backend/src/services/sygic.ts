import axios from 'axios'
import { SYGIC_API_ENDPOINT } from '../constants'

export async function computeDestinationRanking({
  categories,
  destinations,
}: any) {
  const response = await axios.get(
    `${SYGIC_API_ENDPOINT}/trips/templates?parent_place_id=country:19`,
  )
  console.log(response.data)
  return []
}
