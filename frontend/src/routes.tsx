import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Booking } from './pages/Booking'
import { MyTrip } from './pages/MyTrip'

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/booking" component={Booking} />
      <Route path="/mytrip" component={MyTrip} />
    </Switch>
  )
}
