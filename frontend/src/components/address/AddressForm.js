import React, { useState } from 'react'
import './style/addressForm.css'
import env from 'react-dotenv'
import { useForm } from 'react-hook-form'
import { Oval } from 'react-loader-spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPeopleRoof,
  faHouse,
  faBriefcase,
  faLocationDot,
  faH,
} from '@fortawesome/free-solid-svg-icons'

const initialState = {
  addressType: '',
  city: '',
  addressLocation: '',
  postalCode: '',
  state: '',
}

const AddressForm = (props) => {
  const [newAddress, setnewAddress] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const token = localStorage.getItem('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  function onValueChange(e) {
    setSelectedOption(e.target.value)
    setnewAddress({
      [e.target.name]: e.target.value,
    })
  }

  async function formSubmit(e) {
    // e.preventDefault()
    await addAddress()
    props.setShowModal(false)
  }

  //  @method - POST
  //  @access - private
  const addAddress = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${env.BASE_URL}/api/address/create`, {
        method: 'POST',
        body: JSON.stringify({
          address: newAddress,
        }),
        headers: {
          'Content-type': 'application/json',
          Authorization: `${token}`,
        },
      })

      const { address } = await response.json()
      props.setAddress((previousAddress) => [address, ...previousAddress])
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
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
      <form className='address-form flex' onSubmit={handleSubmit(formSubmit)}>
        <div className='address-type-label'>
          <label>
            <input
              type='radio'
              {...register('addressType', {
                required: 'Select an address type',
              })}
              value='Home'
              checked={selectedOption === 'Home'}
              onChange={onValueChange}
            />
            <FontAwesomeIcon icon={faHouse} />
            Home
          </label>
          <label>
            <input
              type='radio'
              {...register('addressType', {
                required: 'Select an address type',
              })}
              value='Office'
              checked={selectedOption === 'Office'}
              onChange={onValueChange}
            />
            <FontAwesomeIcon icon={faBriefcase} />
            Office
          </label>
          <label>
            <input
              type='radio'
              {...register('addressType', {
                required: 'Select an address type',
              })}
              value='PG'
              checked={selectedOption === 'PG'}
              onChange={onValueChange}
            />
            <FontAwesomeIcon icon={faPeopleRoof} />
            PG
          </label>
          <label>
            <input
              type='radio'
              {...register('addressType', {
                required: 'Select an address type',
              })}
              value='other'
              checked={selectedOption === 'other'}
              onChange={onValueChange}
            />
            <FontAwesomeIcon icon={faLocationDot} />
            other
          </label>
          <br />
          {errors.addressType && (
            <p className='error'>{errors.addressType.message}</p>
          )}
        </div>
        <div>
          <label>Location : </label>
          <input
            type='text'
            {...register('addressLocation', {
              required: 'Location is required',
            })}
            placeholder='Hno. 123, XYZ colony...'
            onChange={onHandleChange}
          />
          {errors.addressLocation && (
            <p className='error'>{errors.addressLocation.message}</p>
          )}
        </div>
        <div>
          <label>City : </label>
          <input
            type='text'
            {...register('city', { required: 'City is required' })}
            onChange={onHandleChange}
          />
          {errors.city && <p className='error'>{errors.city.message}</p>}
        </div>
        <div>
          <label>State : </label>
          <input
            type='text'
            {...register('state', { required: 'State is required' })}
            onChange={onHandleChange}
          />
          {errors.state && <p className='error'>{errors.state.message}</p>}
        </div>
        <div>
          <label>Postal Code : </label>
          <input
            type='text'
            {...register('postalCode', {
              required: 'Postal Code is required',
              pattern: {
                value: /^\d{6}$/,
                message: 'Postal Code must be a 6-digit number',
              },
            })}
            onChange={onHandleChange}
          />
          {errors.postalCode && (
            <p className='error'>{errors.postalCode.message}</p>
          )}
        </div>

        <div className='flex-center'>
          <button className='btn main-btn' type='submit'>
            {loading ? (
              <Oval
                height={30}
                width={30}
                color='#efefef'
                wrapperStyle={{}}
                wrapperClass=''
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor='#4fa94d'
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            ) : (
              'ADD'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddressForm
