import React from 'react'
import { Routes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Navigation } from './components/Navigation'
import { TripContextProvider } from './TripContex'

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <TripContextProvider>
        <Routes />
      </TripContextProvider>
    </Router>
  )
}

export default App
