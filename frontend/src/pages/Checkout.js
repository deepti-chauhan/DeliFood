import React, { useState, useRef } from 'react'
import { useGlobalCartContext } from '../store/CartProvider'

const Checkout = (props) => {
  const cartContext = useGlobalCartContext()
  const cartCheckoutAmount = cartContext.totalAmount.toFixed(2)
  const { username, email } = JSON.parse(localStorage.getItem('user'))

  const isEmpty = (value) => value.trim().length === ''
  const isSixChars = (value) => value.trim().length === 6
  const today = new Date()

  const [isValid, setIsValid] = useState({
    name: true,
    email: true,
    address: { locality: true, city: true, state: true, postal: true },
  })

  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const addressInputRef = useRef()
  const stateInputRef = useRef()
  const cityInputRef = useRef()
  const postalInputRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()

    console.log('checkout start...')

    const enteredName = nameInputRef.current.value
    const enteredEmail = emailInputRef.current.value
    const enteredAddress = addressInputRef.current.value
    const enteredState = stateInputRef.current.value
    const enteredPostal = postalInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredEmailIsValid = !isEmpty(enteredEmail)
    const enteredAddressIsValid = !isEmpty(enteredAddress)
    const enteredStateIsValid = !isEmpty(enteredState)
    const enteredCityIsValid = !isEmpty(enteredCity)
    const enteredPostalIsValid = isSixChars(enteredPostal)

    setIsValid({
      name: enteredNameIsValid,
      email: enteredEmailIsValid,
      address: {
        locality: enteredAddressIsValid,
        state: enteredStateIsValid,
        city: enteredCityIsValid,
        postal: enteredPostalIsValid,
      },
    })

    const formIsValid =
      enteredNameIsValid &&
      enteredEmailIsValid &&
      enteredCityIsValid &&
      enteredAddressIsValid &&
      enteredPostalIsValid &&
      enteredStateIsValid

    if (!formIsValid) {
      return
    }

    props.onConfirm({
      name: enteredName,
      email: enteredEmail,
      address: {
        locality: enteredAddress,
        state: enteredState,
        city: enteredCity,
        postal: enteredPostal,
      },
      date:
        today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate(),
    })
  }

  const goBackHandler = () => {
    props.setIsCheckout(false)
    props.setIsPayments(true)
  }

  const paymentHandler = () => {
    console.log('order placed')
  }

  return (
    <div className='checkout-container'>
      <div>
        <p>{`Your Cart Total : $ ${cartCheckoutAmount}`}</p>
        <form onSubmit={submitHandler}>
          <h4>1. Contact information</h4>
          <div>
            <label>First Name</label>
            <input type='text' ref={nameInputRef} value={username} required />
            <label>Last Name</label>
            <input type='text' ref={nameInputRef} value={username} required />
          </div>
          <div>
            <label>Phone no.</label>
            <input type='text' />
          </div>
          <div>
            <label for='email'>Email</label>
            <input type='text' ref={emailInputRef} value={email} disabled />
          </div>
          <div>
            <label for='address'>Address</label>
            <br />
            <textarea
              name='address'
              cols='40'
              rows='4'
              ref={addressInputRef}
              required
            />
            {!isValid.address.locality && <p>please enter address</p>}
          </div>
          <div>
            <label>State</label>
            <input ref={stateInputRef} />
            {!isValid.address.state && <p>enter valid state</p>}
            <label>City</label>
            <input ref={cityInputRef} />
            {!isValid.address.city && <p>enter valid city</p>}
            <label>Pin Code</label>
            <input ref={postalInputRef} />
            {!isValid.address.postal && <p>enter valid pincode</p>}
          </div>
          <div className='flex-sb'>
            <button
              className='btn checkout-btn cancel-btn'
              onClick={goBackHandler}
            >
              Go Back
            </button>
            <button className='btn checkout-btn order-btn'>Pay</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
