import React from 'react'
import { Dropdown, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

import { Location } from '../models/Location'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCity, faHiking } from '@fortawesome/free-solid-svg-icons'

import 'react-datepicker/dist/react-datepicker.css'
import './SearchForm.css'
import { Category } from '../models/Category'

const MOCK_LOCATIONS: Location[] = [
  { id: 1, name: 'Zurich' },
  { id: 2, name: 'Bern' },
  { id: 3, name: 'Lucerne' },
]

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'City Trip', icon: faCity },
  { id: 2, name: 'Hiking', icon: faHiking },
]

const initialState = {
  locations: MOCK_LOCATIONS,
  categories: MOCK_CATEGORIES,
}

interface Props {}

export const SearchForm: React.FC<Props> = ({}) => {
  const locationOptions: {
    text: string
    value: string
  }[] = initialState.locations.map(location => {
    return { text: location.name, value: location.id.toString() }
  })

  let date = new Date()

  const handleChange = (date: Date) => {
    date = date
  }

  return (
    <div>
      <form className="ui form">
        <Dropdown
          placeholder="Start Point"
          fluid
          multiple
          selection
          options={locationOptions}
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

        <br></br>

        <div className="categories">
          {initialState.categories.map(category => (
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="radioGroup" value={category.id} />
                <label>
                  <div className="icon">
                    <FontAwesomeIcon icon={category.icon} />
                  </div>
                  {category.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}
