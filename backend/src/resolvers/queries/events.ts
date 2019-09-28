import * as EventService from '../../services/events'

async function getEvents(_, args) {
  return EventService.getPlaceEvents(args)
}

export { getEvents }
