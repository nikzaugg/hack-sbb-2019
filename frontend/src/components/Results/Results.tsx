import React, { useState } from 'react'
import { ResultList } from './ResultList/ResultList'

const initialState = {
  results: [
    {
      from: '',
      to: '',
      date: '',
      price: '',
      category: '',
      discount: '',
    },
  ],
}

interface Props {}

export const Results: React.FC<Props> = () => {
  const [selected, setSelected] = useState({})
  return (
    <div>
      <ResultList />
    </div>
  )
}
