import * as TripsService from '../../services/trips'

async function getSurpriseTrips(_, args) {
  return TripsService.computeTrips(args)
}

export { getSurpriseTrips }
