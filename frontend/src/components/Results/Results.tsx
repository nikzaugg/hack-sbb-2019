import React, { useState } from 'react'
import { ResultItem } from './ResultItem/ResultItem'
import { Result } from '../../models/Result'

const MOCK_RESULTS: Result[] = [
  {
    id: 1,
    from: 'Bern',
    to: 'Grindelwald',
    date: '2019-09-29T15:37:27+02:00',
    price: 1090,
    category: 'hiking',
    discount: 50,
    vehicles: ['train', 'ship', 'bus'],
  },
  {
    id: 2,
    from: 'Bern',
    to: 'Genf',
    date: '2019-09-29T13:37:27+02:00',
    price: 3200,
    category: 'city',
    discount: 50,
    vehicles: ['train', 'ship'],
  },
  {
    id: 3,
    from: 'Bern',
    to: 'Lausanne',
    date: '2019-09-29T13:37:27+02:00',
    price: 2205,
    category: 'city',
    discount: 50,
    vehicles: ['train'],
  },
]

const initial_state = MOCK_RESULTS

interface Props {}

export const Results: React.FC<Props> = () => {
  return (
    <div>
      {initial_state.map((item, index) => (
        <ResultItem
          key={item.id}
          id={item.id}
          from={item.from}
          to={item.to}
          date={item.date}
          price={item.price}
          category={item.category}
          discount={item.discount}
          vehicles={item.vehicles}
        />
      ))}
    </div>
  )
}
