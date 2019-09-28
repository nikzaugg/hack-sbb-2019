import React, { useState } from 'react'
import { Accordion, Icon, Button, Segment } from 'semantic-ui-react'
import { TripSegment } from './TripSegment'

import './MyAccordion.css'

interface Props {
  visible: boolean
  icon: string
  text: string
  activeStep: number
}

export const MyAccordion: React.FC<Props> = ({
  visible,
  icon,
  text,
  activeStep,
}) => {
  return (
    <div className={visible ? 'slit-in-vertical' : 'hide'}>
      <TripSegment text={text} icon={icon} activeStep={activeStep} />
    </div>
  )
}
