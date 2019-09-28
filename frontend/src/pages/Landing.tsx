import React from 'react'
import { Card, Button } from 'semantic-ui-react'

interface Props {}

export const Landing: React.FC<Props> = () => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>Card Header</Card.Header>
        <Card.Content>Some card content</Card.Content>
        <Card.Meta>
          <Button primary>Press me</Button>
        </Card.Meta>
      </Card.Content>
    </Card>
  )
}
