import React, { useState } from 'react'
import UserProfile from '../components/profile/UserProfile'
import OrderHistory from '../components/profile/OrderHistory'
import AddressBook from '../components/profile/AddressBook'
import Settings from '../components/profile/Settings'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Profile = () => {
  const [section, setSection] = useState('user')
  const navigate = useNavigate()

  const { username } = JSON.parse(localStorage.getItem('user'))

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()
    Swal.fire({
      title: 'Success!',
      text: 'Logout successfully',
      icon: 'success',
      button: 'OK',
    })
  }

  const sectionState = (state) => {
    switch (state) {
      case 'user':
        return <UserProfile />
      case 'order':
        return <OrderHistory />
      case 'address':
        return <AddressBook />
      case 'settings':
        return <Settings />
    }
  }

  const logoutHandler = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#557c55',
      cancelButtonColor: '#D74234',
      confirmButtonText: 'Yes, LOGOUT!',
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
      }
    })
  }

  return (
    <div className='profile-container'>
      <div className='profile-header flex-center'>
        <div className='flex-sb'>
          <div>{`Welcome ${username}`}</div>

          <button className='btn btn-primary' onClick={logoutHandler}>
            logout
          </button>
        </div>
      </div>
      <div className='profile-tab flex-center'>
        <button className='profile-button' onClick={() => setSection('user')}>
          Profile
        </button>
        <button className='profile-button' onClick={() => setSection('order')}>
          Order History
        </button>
        <button
          className='profile-button'
          onClick={() => setSection('address')}
        >
          Address Book
        </button>
      </div>
      <div>{sectionState(section)}</div>
    </div>
  )
}

export default Profile
