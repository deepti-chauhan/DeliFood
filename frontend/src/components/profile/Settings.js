import React, { useState } from 'react'
import Modal from '../shared/Modal'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const { email } = JSON.parse(localStorage.getItem('user'))

  const deleteAccount = async (userEmail) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/delete', {
        method: 'POST',
        body: JSON.stringify(userEmail),
      })

      const { message } = await response.json()
      console.log(message)
    } catch (error) {
      console.log(error)
    }
  }

  const onClickHandler = () => {
    deleteAccount(email)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload()
  }

  const onClose = () => {
    setShowModal(false)
  }
  const modalContent = (
    <div>
      <h2> are you sure you want to delete your account permenantly !!!</h2>
      <button className='btn btn-primary' onClick={onClickHandler}>
        YES
      </button>
      <button className='btn btn-primary' onClick={onClose}>
        NO
      </button>
    </div>
  )
  return (
    <div className='flex-center'>
      <p>Settings</p>
      <button className='btn btn-primary' onClick={() => setShowModal(true)}>
        delete Account
      </button>
      {showModal && <Modal onClose={onClose}>{modalContent}</Modal>}
    </div>
  )
}

export default Settings
