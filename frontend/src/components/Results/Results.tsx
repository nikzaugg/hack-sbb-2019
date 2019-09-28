import React from 'react'
import { ResultItem } from './ResultItem/ResultItem'
import { SearchResult } from '../../models/SearchResult'

const MOCK_RESULTS: SearchResult[] = [
  {
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
  },
  {
    price: 10,
    discount: 65,
    start: '1546325700',
    end: '1546371900',
    categories: {
      hiking: 25,
      playing: 2,
      sightseeing: 3,
      eating: 3,
      going_out: 3,
    },
  },
  {
    price: 10,
    discount: 65,
    start: '1546325700',
    end: '1546371900',
    categories: {
      hiking: 1,
      playing: 24,
      sightseeing: 4,
      eating: 17,
      going_out: 3,
    },
  },
  {
    price: 10,
    discount: 65,
    start: '1546325700',
    end: '1546371900',
    categories: {
      hiking: 6,
      playing: 2,
      sightseeing: 2,
      eating: 23,
      going_out: 30,
    },
  },
]

const initial_state = MOCK_RESULTS

interface Props {
  results: SearchResult[]
}

export const Results: React.FC<Props> = ({ results }) => {
  return (
    <div>
      {results.map((item, index) => (
        <ResultItem data={item} />
      ))}
    </div>
  )
}
