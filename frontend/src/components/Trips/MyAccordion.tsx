import React from 'react'
import { TripSegment } from './TripSegment'

import './MyAccordion.css'

interface Props {
  visible: boolean
  icon: string
  text: string
  activeStep: number
  origin: any
  destination: any
}

export const MyAccordion: React.FC<Props> = ({
  visible,
  icon,
  text,
  activeStep,
  origin,
  destination,
}) => {
  return (
    <div className={visible ? 'slit-in-vertical' : 'hide'}>
      <TripSegment
        text={text}
        icon={icon}
        activeStep={activeStep}
        origin={origin}
        destination={destination}
      />
    </div>
  )
}
