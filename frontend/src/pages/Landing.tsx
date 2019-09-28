import React, { useState } from 'react'
import { useHistory } from 'react-router'

import { SearchForm } from '../components/SearchForm'
import { Results } from '../components/Results/Results'

import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'

import Lottie from 'react-lottie'
import * as animationData from './5503-dlivery-man.json'

export const GET_SURPRISE_TRIPS = gql`
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
      bestOut {
        id
        class
        segments {
          origin {
            name
            time
            track
          }
          destination {
            name
            time
            track
          }
        }
      }
      bestReturn {
        id
        class
        segments {
          origin {
            name
            time
            track
          }
          destination {
            name
            time
            track
          }
        }
      }
      categories {
        hiking
        playing
        sightseeing
        eating
        shopping
      }
    }
  }
`

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: (animationData as any).default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

interface Props { }

export const Landing: React.FC<Props> = () => {
  const history = useHistory()

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

  return (
    <div>
      <SearchForm loading={isLoading} searchTrips={searchTrips} />
      {!isLoading && data && (
        <Results
          results={data.getSurpriseTrips}
          handleChoose={(originId: any, destinationId: any) =>
            history.push(`/mytrip/${originId}/${destinationId}`)
          }
        />
      )}
      {!isLoading && data && data.getSurpriseTrips.length === 0 && (
        <div style={{ padding: '5px' }}>
          No surprises available. Please, try again later.
        </div>
      )}

      {isLoading && (
        <Lottie
          options={defaultOptions}
          height={300}
          width={300}
          isStopped={false}
          isPaused={false}
        />
      )}
    </div>
  )
}
