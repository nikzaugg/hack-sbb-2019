import React from 'react'
import { SearchForm } from '../components/SearchForm'
import { Results } from '../components/Results/Results'

import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'

import { Loader } from 'semantic-ui-react'

const GET_SURPRISE_TRIPS = gql`
  query trips(
    $originId: Int!
    $travelDate: String!
    $maxPrice: Int!
    $withHalfFare: Boolean!
    $categories: [String!]
  ) {
    getSurpriseTrips(
      originId: $originId
      travelDate: $travelDate
      maxPrice: $maxPrice
      withHalfFare: $withHalfFare
      categories: $categories
    ) {
      price
      discount
      start
      end
      categories {
        hiking
        playing
        sightseeing
        eating
        going_out
      }
    }
  }
`

interface Props {}

export const Landing: React.FC<Props> = () => {
  const [queryResults, { loading, data }] = useLazyQuery(GET_SURPRISE_TRIPS)

  const searchTrips = (
    originId: number,
    travelDate: string,
    maxPrice: number,
    withHalfFare: boolean,
    categories: string[],
  ): void => {
    queryResults({
      variables: {
        originId: +originId,
        travelDate,
        maxPrice,
        withHalfFare,
        categories,
      },
    })
  }

  return (
    <div>
      <SearchForm searchTrips={searchTrips} />
      {loading && <Loader active />}
      {data && <Results results={data.getSurpriseTrips} />}
    </div>
  )
}
