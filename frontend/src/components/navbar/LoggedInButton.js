import React from 'react'
import { Link } from 'react-router-dom'

const LoggedInButton = ({ name }) => {
  return (
    <Link to='/profile'>
      <button className='btn btn-primary'>
        {name}
      </button>
    </Link>
  )
}

export default LoggedInButton
