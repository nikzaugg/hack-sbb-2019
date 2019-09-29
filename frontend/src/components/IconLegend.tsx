import React from 'react'
import {
  faCity,
  faHiking,
  faUtensils,
  faShoppingBag,
  faBabyCarriage,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './IconLegend.css';
import { Divider } from 'semantic-ui-react';

interface Props {

}

const icons = [
  { name: 'hiking', icon: faHiking },
  { name: 'city', icon: faCity },
  { name: 'eating', icon: faUtensils },
  { name: 'shopping', icon: faShoppingBag },
  { name: 'family', icon: faBabyCarriage },
]



export const IconLegend: React.FC<Props> = () => {

  const borderRight = {
    borderRight: '1px solid rgba(1, 1, 1, 0.2)'
  }

  return (
    <div>
      <div className={'icon-legend-flex-wrapper'}>
        {
          icons.map((element, i) => (
            <div className={'flex-column'} style={i !== 4 ? borderRight : {}}>
              <div className={'flex-row'}><FontAwesomeIcon icon={element.icon} /></div>
              <div className={'flex-row'}><div className={"icon-name"}>{element.name}</div></div>
            </div>

          ))
        }

      </div>
      <div style={{ margin: '1em' }}>
        <Divider />
      </div>
    </div>

  )
}
