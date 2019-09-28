import React, { useState } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)

  const [queryResults, { loading, data }] = useLazyQuery(GET_SURPRISE_TRIPS, {
    onCompleted: () => {
      setIsLoading(false)
    },
  })

  const searchTrips = async (
    originId: number,
    travelDate: string,
    maxPrice: number,
    withHalfFare: boolean,
    categories: string[],
  ): Promise<void> => {
    setIsLoading(true)
    await queryResults({
      variables: {
        originId: +originId,
        travelDate,
        maxPrice,
        withHalfFare,
        categories,
      },
    })
  }

  console.log(isLoading)
  return (
    <div>
      <SearchForm loading={isLoading} searchTrips={searchTrips} />
      {!isLoading && data && <Results results={data.getSurpriseTrips} />}
      {!isLoading && data && data.getSurpriseTrips.length === 0 && (
        <div style={{ padding: '5px' }}>
          No surprises available. Please, try again later.
        </div>
      )}
    </div>
  )
}
