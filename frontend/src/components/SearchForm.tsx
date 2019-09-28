import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

import { Location } from '../models/Location'

import 'react-datepicker/dist/react-datepicker.css'
import './SearchForm.css'

const MOCK_LOCATIONS: Location[] = [
  { id: 1, name: 'Zurich' },
  { id: 2, name: 'Bern' },
  { id: 3, name: 'Lucerne' },
]

const initialState = {
  locations: MOCK_LOCATIONS,
}

interface Props {}

export const SearchForm: React.FC<Props> = ({}) => {
  const options: { text: string; value: string }[] = initialState.locations.map(
    location => {
      return { text: location.name, value: location.id.toString() }
    },
  )

  let date = new Date()

  const handleChange = (date: Date) => {
    date = date
  }

  return (
    <div>
      <Dropdown
        placeholder="Start Point"
        fluid
        multiple
        selection
        options={options}
      />

      <br></br>

      <div className="dateWrapper">
        <div className="label">Date:</div>
        <DatePicker
          selected={date}
          onChange={handleChange}
          className="ui input"
        />
      </div>
    </div>
  )
}
