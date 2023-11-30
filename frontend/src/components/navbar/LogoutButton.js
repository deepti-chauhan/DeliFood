import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const LogoutButton = () => {
  const navigate = useNavigate()

  const logOutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()
    Swal.fire({
      title: 'Success!',
      text: 'Logout successfully',
      icon: 'success',
      button: 'OK',
    });
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
