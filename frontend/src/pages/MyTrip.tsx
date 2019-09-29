import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useApolloClient, useLazyQuery } from '@apollo/react-hooks'
import { MyAccordion } from '../components/Trips/MyAccordion'
import { Button, Grid } from 'semantic-ui-react'
import gql from 'graphql-tag'

interface Props {}

const initialState = {
  steps: [
    {
      icon: 'train',
      text: 'Please enjoy your time on this beautiful train ride!',
      checked: true,
      step: 1,
    },
    {
      icon: 'ship',
      text:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren',
      checked: false,
      step: 2,
    },
    {
      icon: 'bus',
      text:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren',
      checked: false,
      step: 3,
    },
    {
      icon: 'train',
      text:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren',
      checked: false,
      step: 4,
    },
  ],
}

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

export const MyTrip: React.FC<Props> = () => {
  const params: any = useParams()
  const client = useApolloClient()

  const [activeStep, setActiveStep] = useState(0)
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [events, setEvents] = useState([])

  const [queryEventList, { data, loading }] = useLazyQuery(EVENTS_QUERY)

  useEffect(() => {
    const origin = client.readFragment({
      id: params.originId,
      fragment: FRAGMENT,
    })

    const destination = client.readFragment({
      id: params.destinationId,
      fragment: FRAGMENT,
    })

    if (origin && destination) {
      queryEventList({
        variables: {
          placeName: params.placeName,
          eventDate: params.travelDate,
        },
      })
    }
  }, [params.originId, params.destinationId, origin, destination])

  const handleClick = () => {
    if (activeStep <= 3) {
      setActiveStep(activeStep + 1)
    }
  }

  return (
    <div>
      <div style={{ margin: '2em 0' }}>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column width={16} textAlign={'center'}>
              <Button
                style={{ background: '#eb0000', color: 'white' }}
                onClick={handleClick}
              >
                {activeStep === 0 ? 'Start My Trip' : 'Continue'}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      {initialState.steps.map((element, index) => {
        return (
          <MyAccordion
            text={element.text}
            icon={element.icon}
            visible={activeStep >= element.step}
            activeStep={activeStep}
          />
        )
      })}
    </div>
  )
}
