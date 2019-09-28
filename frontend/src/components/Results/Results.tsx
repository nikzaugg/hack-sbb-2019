import React from 'react'
import { ResultItem } from './ResultItem/ResultItem'
import { SearchResult } from '../../models/SearchResult'

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
