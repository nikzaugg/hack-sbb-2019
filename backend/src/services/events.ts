const EVENTS = require('../../data/event.json')

async function getEvents({ placeName, eventDate }) {
  return EVENTS.filter(
    event => event.date === eventDate && event.address_city == placeName,
  )
}

export { getEvents }
