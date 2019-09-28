import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { Results } from '../components/Results/Results'

interface Props {}

export const Landing: React.FC<Props> = () => {
  return (
    <div>
      <Results />
    </div>
  )
}
