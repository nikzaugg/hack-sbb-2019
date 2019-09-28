import React, { useContext, useState } from 'react'
import { TripContext } from '../TripContex'
import { MyAccordion } from '../components/MyAccordion'
import { Accordion, Icon, Button, Segment, Grid } from 'semantic-ui-react'

interface Props { }

const initialState = {
  steps: [
    {
      icon: 'train',
      text: 'Please enjoy your time on this beautiful train ride!',
      checked: true,
      step: 1,
    },
    {
      icon: 'ship',
      text:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren',
      checked: false,
      step: 2,
    },
    {
      icon: 'bus',
      text:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren',
      checked: false,
      step: 3,
    },
    {
      icon: 'train',
      text:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren',
      checked: false,
      step: 4,
    },
  ],
}

export const MyTrip: React.FC<Props> = () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleClick = () => {
    if (activeStep <= 3) {
      setActiveStep(activeStep + 1)
    }
  }

  return (
    <div>
      <div style={{ margin: '2em 0' }}>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column width={16} textAlign={'center'}>
              <Button
                style={{ background: '#eb0000', color: 'white' }}
                onClick={handleClick}
              >
                {activeStep === 0 ? 'Start My Trip' : 'Continue'}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      {initialState.steps.map((element, index) => {
        return (
          <MyAccordion
            text={element.text}
            icon={element.icon}
            visible={activeStep >= element.step}
            activeStep={activeStep}
          />
        )
      })}
    </div>
  )
}
