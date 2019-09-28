import * as SygicService from '../../services/sygic'

async function getMatchingPlaces(_, args) {
  return SygicService.getMatchingPlaces(args)
}

async function getPlaceItineraries(_, args) {
  return SygicService.getPlaceItineraries(args)
}

export { getMatchingPlaces, getPlaceItineraries }
