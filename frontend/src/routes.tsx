import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { MyTrip } from './pages/MyTrip'

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/mytrip/:id" component={MyTrip} />
    </Switch>
  )
}
