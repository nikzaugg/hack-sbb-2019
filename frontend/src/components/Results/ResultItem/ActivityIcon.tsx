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

interface Props {
  howmuch: number;
  activity: string;
  size: string;
}

const getIcon = (activity: string): IconDefinition | any => {
  switch (activity) {
    case 'hiking':
      return faHiking;
    case 'sightseeing':
      return faCity;
    case 'eating':
      return faUtensils;
    case 'going_out':
      return faGlassCheers;
    case 'playing':
      return faBabyCarriage
  }
  return null;
}

export const ActivityIcon: React.FC<Props> = ({ activity, howmuch, size }) => {

  return (<div style={{ padding: '0 5px', border: '1px solid red' }}>
    <FontAwesomeIcon
      className={size === 'small' ? 'fa-2x' : 'fa-3x'}
      icon={getIcon(activity)}
    />
  </div>)
}
