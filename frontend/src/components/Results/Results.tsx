import React from 'react'
import { ResultItem } from './ResultItem/ResultItem'
import { SearchResult } from '../../models/SearchResult'

interface Props {
  results: SearchResult[]
  handleChoose: Function
}

export const Results: React.FC<Props> = ({ results, handleChoose }) => {
  return (
    <div>
      {results.map((item, index) => (
        <ResultItem data={item} onChoose={handleChoose} />
      ))}
    </div>
  )
}
