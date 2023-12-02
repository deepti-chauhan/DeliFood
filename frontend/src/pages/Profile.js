import React, { useState } from 'react'
import UserProfile from '../components/profile/UserProfile'
import OrderHistory from '../components/profile/OrderHistory'
import AddressBook from '../components/profile/AddressBook'
import Settings from '../components/profile/Settings'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

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
    <div className='profile-container flex-sb'>
      <div className='profile-side-section flex-sb'>
        <div className='profile-tab flex-center'>
          <div className='profile-icon'>
            <FontAwesomeIcon icon={faCircleUser} />
          </div>
            <h3>{username}</h3>
          <button className='profile-button' onClick={() => setSection('user')}>
            PROFILE
          </button>
          <button
            className='profile-button'
            onClick={() => setSection('order')}
          >
            ORDER HISTORY
          </button>
          <button
            className='profile-button'
            onClick={() => setSection('address')}
          >
            ADDRESS BOOK
          </button>
          <button
            className='profile-button'
            onClick={() => setSection('address')}
          >
            SETTINGS
          </button>
          <button
            className='profile-button'
            onClick={logoutHandler}
          >
            LOGOUT
          </button>
        </div>
        <i className='profile-footer'>
          <b>*Terms & Conditions</b>
        </i>
      </div>

      <div className='profile-main-section'>{sectionState(section)}</div>
    </div>
  )
}

export default Profile
