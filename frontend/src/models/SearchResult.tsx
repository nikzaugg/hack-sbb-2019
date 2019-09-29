export interface SearchResult {
  placeName: string
  price: number
  discount: number
  start: string
  end: string
  bestOut: {
    id: string
    tripId: string
  }
  bestReturn: {
    id: string
  }
  categories: {
    hiking: number
    playing: number
    sightseeing: number
    eating: number
    shopping: number
  },
  emission: {
    co2: string;
    petrol: string;
    duration: string;
  }
  // vehicles: string[]
}
