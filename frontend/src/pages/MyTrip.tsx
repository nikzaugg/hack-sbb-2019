import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useApolloClient, useLazyQuery } from '@apollo/react-hooks'
import { MyAccordion } from '../components/Trips/MyAccordion'
import { Segment, Divider } from 'semantic-ui-react'
import gql from 'graphql-tag'

interface Props { }

const FRAGMENT = gql`
  fragment MyResult on Leg {
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
`

const EVENTS_QUERY = gql`
  query GetEvents($placeName: String!, $eventDate: String!) {
    getEvents(placeName: $placeName, eventDate: $eventDate) {
      event_id
      title_en
      start_time
      end_time
      address_venue_name
      address_city
      homepage
    }
  }
`

const ITINERARIES_QUERY = gql`
  query GetItineraries($placeName: String!) {
    getPlaceItineraries(placeName: $placeName) {
      id
      name
      url
    }
  }
`

export const MyTrip: React.FC<Props> = () => {
  const params: any = useParams()
  const client = useApolloClient()

  const [activeStep, setActiveStep] = useState(0)
  const [origin, setOrigin] = useState()
  const [destination, setDestination] = useState()

  const [
    queryEventList,
    { data: eventsData, loading: eventsLoading },
  ] = useLazyQuery(EVENTS_QUERY)
  const [
    queryItinerariesList,
    { data: itinerariesData, loading: itinerariesLoading },
  ] = useLazyQuery(ITINERARIES_QUERY)

  useEffect(() => {
    window.addEventListener('keydown', keyPress => {
      if (keyPress.key === 'i') {
        setActiveStep(prev => prev + 1)
      }
    })

    return () => {
      window.removeEventListener('keydown', keyPress => console.log(keyPress))
    }
  }, [])

  useEffect(() => {
    setOrigin(
      client.readFragment({
        id: params.originId,
        fragment: FRAGMENT,
      }),
    )

    setDestination(
      client.readFragment({
        id: params.destinationId,
        fragment: FRAGMENT,
      }),
    )

    if (origin && destination) {
      queryEventList({
        variables: {
          placeName: params.placeName,
          eventDate: params.travelDate,
        },
      })
      queryItinerariesList({
        variables: {
          placeName: params.placeName,
        },
      })
    }
  }, [params.originId, params.destinationId])


  return (
    <div>
      {origin &&
        origin.segments.map((segment: any, index: any) => (
          <MyAccordion
            text="asdasdasd"
            icon="train"
            visible={activeStep > index}
            activeStep={activeStep - 1}
            origin={segment.origin}
            destination={segment.destination}
          />
        ))}

      {origin && activeStep > origin.segments.length && (
        <Segment>
          <strong>Free Time:{" "}</strong>
          {origin.segments[origin.segments.length - 1].destination.time} -{' '}
          {destination && destination.segments[0].origin.time}{' '}

          {eventsData && eventsData.map((event: any, index: any) => {
            return (
              <div>
                <Divider />
                <h3>{event.title_en}</h3>
              </div>
            )

          })}

          {itinerariesData && itinerariesData.map((event: any, index: any) => {
            return (
              <div>
                <Divider />
                <h3>{event.name}</h3>
              </div>
            )

          })}

        </Segment>
      )}

      {destination &&
        destination.segments.map((segment: any, index: any) => (
          <MyAccordion
            text="asdasdasd"
            icon="train"
            visible={activeStep - origin.segments.length > index}
            activeStep={activeStep - origin.segments.length}
            origin={segment.origin}
            destination={segment.destination}
          />
        ))}
    </div>
  )
}
