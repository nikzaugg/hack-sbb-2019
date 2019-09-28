import React, { useState } from 'react'
import { SearchResult } from './models/SearchResult'

const TripContext = React.createContext({
  price: 10,
  discount: 65,
  start: '1546325700',
  end: '1546371900',
  categories: {
    hiking: 25,
    playing: 2,
    sightseeing: 15,
    eating: 20,
    going_out: 3,
  },
  setTrip: (property: any, vaue: any) => {},
})

const TripContextProvider = (props: any) => {
  const TripInformation = {
    price: 10,
    discount: 65,
    start: '1546325700',
    end: '1546371900',
    categories: {
      hiking: 25,
      playing: 2,
      sightseeing: 15,
      eating: 20,
      going_out: 3,
    },
    setTrip: (property: any, value: any) => {
      setTripInfo({ ...tripInfo, [property]: value })
    },
  }

  const [tripInfo, setTripInfo] = useState(TripInformation)

  return (
    <TripContext.Provider value={tripInfo}>
      {props.children}
    </TripContext.Provider>
  )
}

export { TripContext, TripContextProvider }
