import React, { useState, SyntheticEvent } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

import { Origin } from '../models/Origin'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCity, faHiking } from '@fortawesome/free-solid-svg-icons'

import 'react-datepicker/dist/react-datepicker.css'
import './SearchForm.css'
import { Activity } from '../models/Activity'

const MOCK_ORIGINS: Origin[] = [
  { id: 1, name: 'Zurich' },
  { id: 2, name: 'Bern' },
  { id: 3, name: 'Lucerne' },
]

const MOCK_ACTIVITIES: Activity[] = [
  { id: 1, name: 'Hiking', icon: faHiking },
  { id: 2, name: 'Sightseeing', icon: faCity },
  { id: 3, name: 'Shopping', icon: null },
  { id: 4, name: 'Playing', icon: null },
  { id: 5, name: 'Eating', icon: null },
]

const initialState = {
  origins: MOCK_ORIGINS,
  activities: MOCK_ACTIVITIES,
}

interface Props {}

export const SearchForm: React.FC<Props> = ({}) => {
  const [selectedOrigin, setSelectedOrigin] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedActivities, setSelectedActivities] = useState([])

  const originOptions: {
    text: string
    value: string
  }[] = initialState.origins.map(origin => {
    return { text: origin.name, value: origin.id.toString() }
  })

  const activityOptions: {
    text: string
    value: string
  }[] = initialState.activities.map(activity => {
    return { text: activity.name, value: activity.id.toString() }
  })

  const onOriginChange = (event: SyntheticEvent, data: any) => {
    setSelectedOrigin(data.value)
  }

  const onDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const onActivityChange = (event: SyntheticEvent, data: any) => {
    setSelectedActivities(data.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log('origins', selectedOrigin)
    console.log('date', selectedDate)
    console.log('activity', selectedActivities)
  }

  return (
    <div>
      <form className="ui form" onSubmit={handleSubmit}>
        <Dropdown
          placeholder="Where does your trip start?"
          fluid
          selection
          options={originOptions}
          onChange={onOriginChange}
        />

        <br></br>

        <div className="dateWrapper">
          <div className="label">Date:</div>
          <DatePicker
            selected={selectedDate}
            onChange={onDateChange}
            className="ui input"
          />
        </div>

        <br></br>

        <Dropdown
          placeholder="Select your desired activities"
          fluid
          multiple
          selection
          options={activityOptions}
          onChange={onActivityChange}
        />

        <Button type="submit" style={{ width: '100%' }}>
          Search
        </Button>
      </form>
    </div>
  )
}
