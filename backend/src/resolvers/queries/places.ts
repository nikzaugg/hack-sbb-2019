import * as SygicService from '../../services/sygic'

async function getMatchingPlaces(_, args) {
  return SygicService.getMatchingPlaces({
    categories: args.categories,
  })
}

export { getMatchingPlaces }
