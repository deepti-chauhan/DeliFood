import React, { useState } from 'react'
import Modal from '../components/shared/Modal'
import UserProfile from '../components/profile/UserProfile'
import OrderHistory from '../components/profile/OrderHistory'
import AddressBook from '../components/profile/AddressBook'
import Settings from '../components/profile/Settings'
import LogoutButton from '../components/navbar/LogoutButton'

const Profile = () => {
  const [showModal, setShowModal] = useState(false)
  const [section, setSection] = useState('user')

  const { username, email } = JSON.parse(localStorage.getItem('user'))

  const onClose = () => {
    setShowModal(false)
  }

  const logoutStatus = (
    <div>
      <p>{`${username}, are you sure?`}</p>
      <LogoutButton />
    </div>
  )

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

  return (
    <div className=''>
      <div className='flex-se'>
        <div>
          <span>{`Welcome ${username}. . .`}</span>
          <br />
          <span>{`${email}`}</span>
        </div>
        <button className='btn btn-primary' onClick={() => setShowModal(true)}>
          logout
        </button>
      </div>
      <div className='flex-se'>
        <button onClick={() => setSection('user')}>Profile</button>
        <button onClick={() => setSection('order')}>Order History</button>
        <button onClick={() => setSection('address')}>Address Book</button>
        <button onClick={() => setSection('settings')}>Settings</button>
      </div>

      <div>{sectionState(section)}</div>

      {showModal && <Modal onClose={onClose}>{logoutStatus}</Modal>}
    </div>
  )
}

export default Profile
