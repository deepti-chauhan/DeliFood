import React, { useState } from 'react'
import './style/addressForm.css'
import env from 'react-dotenv'

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
  const token = localStorage.getItem('token')


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
    props.setShowModal(false)
  }


  //  @method - POST
  //  @access - private
  const addAddress = async () => {
    try{
      const response = await fetch(`${env.BASE_URL}/api/newaddress`,{
            method : 'POST',
            body : JSON.stringify({
              address : newAddress
            }),
            headers : {
              'Content-type' : 'application/json',
              'Authorization' : `${token}`
            }
        })
        
        const {address} = await response.json()
        props.setAddress((previousAddress)=> [address, ...previousAddress])
        console.log(address)
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
            value={newAddress.addressLocation}
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
