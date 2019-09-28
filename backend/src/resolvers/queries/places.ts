import * as SygicService from '../../services/sygic'

async function getMatchingPlaces(_, args) {
  return SygicService.getMatchingPlaces({
    categories: args.categories,
  })
}

async function getPlaceItineraries(_, args) {
  return SygicService.getPlaceItineraries({
    placeName: 'Zurich',
  })
}

export { getMatchingPlaces, getPlaceItineraries }
