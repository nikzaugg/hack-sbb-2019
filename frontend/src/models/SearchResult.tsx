export interface SearchResult {
  price: number
  discount: number
  start: string
  end: string
  bestOut: {
    id: string
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
  }
  // vehicles: string[]
}
