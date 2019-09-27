import React from 'react'

import { Card, Container, Button } from 'semantic-ui-react'

const App: React.FC = () => {
  return (
    <Container>
      <Card>
        <Card.Content>
          <Card.Header>Card Header</Card.Header>
          <Card.Content>Some card content</Card.Content>
          <Card.Meta>
            <Button primary>Press me</Button>
          </Card.Meta>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default App
