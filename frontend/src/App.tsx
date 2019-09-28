import React from 'react'
import { Routes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navigation } from './components/Navigation'

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes />
    </Router>
  )
}

export default App
