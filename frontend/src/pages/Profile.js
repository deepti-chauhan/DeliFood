import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()

  const logOutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()
  }
  return (
    <div className='flex-center'>
      <button className='btn btn-primary' onClick={logOutHandler}>
        logout
      </button>
    </div>
  )
}

export default Profile
