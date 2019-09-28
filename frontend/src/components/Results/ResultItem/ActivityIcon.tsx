import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCity,
  faHiking,
  faUtensils,
  faGlassCheers,
  faBabyCarriage,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { Rating } from 'semantic-ui-react'

interface Props {
  weight: number
  activity: string
  size: string
}

const getIcon = (activity: string): IconDefinition | any => {
  switch (activity) {
    case 'hiking':
      return faHiking
    case 'sightseeing':
      return faCity
    case 'eating':
      return faUtensils
    case 'going_out':
      return faGlassCheers
    case 'playing':
      return faBabyCarriage
  }
  return null
}

export const ActivityIcon: React.FC<Props> = ({ activity, size, weight }) => {
  return (
    <div style={{ display: 'flex', flexFlow: 'column', padding: '0 5px' }}>
      <FontAwesomeIcon
        className={size === 'small' ? 'fa-1x' : 'fa-3x'}
        icon={getIcon(activity)}
      />
    </div>
  )
}
