import React from 'react'
import { SearchForm } from '../components/SearchForm'
import { Results } from '../components/Results/Results'

interface Props {}

export const Landing: React.FC<Props> = () => {
  return (
    <div>
      <SearchForm />
      <hr></hr>
      <Results />
    </div>
  )
}
