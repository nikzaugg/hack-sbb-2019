import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import { Location } from '../models/Location'

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

  return (
    <div>
      <Dropdown
        placeholder="Start Point"
        fluid
        multiple
        selection
        options={options}
      />
    </div>
  )
}
