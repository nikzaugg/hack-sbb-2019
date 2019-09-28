import * as sbb from './queries/sbb'
import * as auth from './mutations/auth'

import * as EventService from '../services/events'
import * as SygicService from '../services/sygic'
import * as TripsService from '../services/trips'

async function getSurpriseTrips(_, args) {
  return TripsService.computeTrips(args)
}

async function getMatchingPlaces(_, args) {
  return SygicService.getMatchingPlaces(args)
}

async function getPlaceItineraries(_, args) {
  return SygicService.getPlaceItineraries(args)
}

async function getEvents(_, args) {
  return EventService.getPlaceEvents(args)
}

export default {
  Mutation: {
    ...auth,
  },
  Query: {
    ...sbb,
    getEvents,
    getMatchingPlaces,
    getPlaceItineraries,
    getSurpriseTrips,
  },
}
