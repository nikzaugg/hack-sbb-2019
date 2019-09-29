import React from 'react'
import { Link } from 'react-router-dom'

import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'

import './Activities.css'

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
        shopping
      }
      emission {
        co2
        petrol
        duration
      }
    }
  }
`

interface Props {}

export const Activities: React.FC<Props> = () => {
  return <div>hello world</div>
}
