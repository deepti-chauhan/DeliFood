import React, { useState } from 'react'
import './style/addressForm.css'

const initialState = {
  addressType: '',
  city: '',
  addressLocation: '',
  postalCode: '',
  state: '',
}

const AddressForm = (props) => {

  const [newAddress, setnewAddress] = useState(initialState)
  const [selectedOption, setSelectedOption] = useState('')

  const {email} = JSON.parse(localStorage.getItem('user'))


  function onValueChange(e) {
    setSelectedOption(e.target.value)
    setnewAddress({
      [e.target.name]: e.target.value,
    })
  }

  function formSubmit(e) {
    e.preventDefault()
    console.log('Your address type is ' + selectedOption)
    console.log(newAddress)

    addAddress()
    props.setAddress((previousAddress)=> [newAddress, ...previousAddress])
    props.setShowModal(false)
  }


  //@api - POST
  const addAddress = async () => {
    try{
        const response = await fetch('http://localhost:5000/api/newaddress',{
            method : 'POST',
            body : JSON.stringify({
                email : email,
                address : newAddress
            }),
            headers : {
                'Content-type' : 'application/json',
            }
        })

        const {message} = await response.json()
        console.log(message)
    }catch(e){
        console.log(e)
    }
  }

  const onHandleChange = (e) => {
    setnewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    })
  }


  return (
    <div>
      <form className='address-form flex' onSubmit={formSubmit}>
        <div>
          <label>
            <input
              type='radio'
              name='addressType'
              value='Home'
              checked={selectedOption === 'Home'}
              onChange={onValueChange}
            />
            Home
          </label>
          <label>
            <input
              type='radio'
              name='addressType'
              value='Office'
              checked={selectedOption === 'Office'}
              onChange={onValueChange}
            />
            Office
          </label>
          <label>
            <input
              type='radio'
              name='addressType'
              value='PG'
              checked={selectedOption === 'PG'}
              onChange={onValueChange}
            />
            PG
          </label>
          <label>
            <input
              type='radio'
              name='addressType'
              value='other'
              checked={selectedOption === 'other'}
              onChange={onValueChange}
            />
            other
          </label>
          <br />
        </div>
        <div>
          <label>Location : </label>
          <input
            type='text'
            name='addressLocation'
            value={newAddress.newAddressLocation}
            placeholder='Hno. 123, XYZ colony...'
            onChange={onHandleChange}
          />
        </div>
        <div>
          <label>City : </label>
          <input
            type='text'
            name='city'
            value={newAddress.city}
            onChange={onHandleChange}
          />
        </div>
        <div>
          <label>State : </label>
          <input
            type='text'
            name='state'
            value={newAddress.state}
            onChange={onHandleChange}
          />
        </div>
        <div>
          <label>Postal Code : </label>
          <input
            type='text'
            name='postalCode'
            value={newAddress.postalCode}
            onChange={onHandleChange}
          />
        </div>

        <button className='btn main-btn'>ADD</button>
      </form>
    </div>
  )
}

export default AddressForm