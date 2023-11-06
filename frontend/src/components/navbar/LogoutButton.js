import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate()

  const logOutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()
  }
  return (
    <div>
      <button onClick={logOutHandler} className='btn btn-primary'>
        yes, Logout
      </button>
    </div>
  )
}

export default LogoutButton
