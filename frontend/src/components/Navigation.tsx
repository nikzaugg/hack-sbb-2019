import React from 'react'
import { Link } from 'react-router-dom'

import './Navigation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchLocation, faGift } from '@fortawesome/free-solid-svg-icons'

interface Props { }

export const Navigation: React.FC<Props> = () => {
  return (
    <div className="nav">
      <div className="links">
        <Link className="link" to="/">
          <FontAwesomeIcon icon={faSearchLocation} />
        </Link>
        <Link className="link" to="/mytrip">
          <FontAwesomeIcon icon={faGift} />
        </Link>
      </div>
      <span className="title"><strong>SBB</strong> <span style={{ fontStyle: "italic" }}>unwheels</span></span>
      <img src="./logo.png" alt=""></img>
    </div>
  )
}
