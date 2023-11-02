import React from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const SignInButton = () => {
  return (
    <Link to='/signin'>
      <button className='btn btn-primary'>
        Sign in <FaSignInAlt />
      </button>
    </Link>
  )
}

export default SignInButton
