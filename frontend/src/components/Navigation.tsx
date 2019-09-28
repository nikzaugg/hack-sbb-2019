import React from 'react'
import { Link } from 'react-router-dom'

interface Props { }

export const Navigation: React.FC<Props> = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/booking">Booking</Link>
      <Link to="/mytrip">My Trip</Link>
    </>
  )
}
