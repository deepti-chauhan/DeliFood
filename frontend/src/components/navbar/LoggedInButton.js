import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCircleUser } from '@fortawesome/free-solid-svg-icons'

const LoggedInButton = ({ name }) => {
  return (
    <Link to='/profile'>
      <button className='btn login-btn'>
        <FontAwesomeIcon icon={faCircleUser}  />{' '}{name}
      </button>
    </Link>
  )
}

export default LoggedInButton
