import React, { useState, SyntheticEvent } from 'react'
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
  const [selectedLocations, setSelectedLocations] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedCategory, setSelectedCategory] = useState(
    MOCK_CATEGORIES[0].id,
  )

  const locationOptions: {
    text: string
    value: string
  }[] = initialState.locations.map(location => {
    return { text: location.name, value: location.id.toString() }
  })

  const onLocationChange = (event: SyntheticEvent, data: any) => {
    setSelectedLocations(data.value)
  }

  const onDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const onSelectCategory = (event: any) => {
    setSelectedCategory(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log('locations', selectedLocations)
    console.log('date', selectedDate)
    console.log('category', selectedCategory)
  }

  return (
    <div>
      <form className="ui form" onSubmit={handleSubmit}>
        <Dropdown
          placeholder="Start Point"
          fluid
          multiple
          selection
          options={locationOptions}
          onChange={onLocationChange}
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

        <div className="categories">
          {initialState.categories.map(category => (
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="radioGroup"
                  checked={selectedCategory === category.id}
                  value={category.id}
                  onChange={onSelectCategory}
                />
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

        <Button type="submit" style={{ width: '100%' }}>
          Search
        </Button>
      </form>
    </div>
  )
}
