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
      enteredAddressIsValid &&
      enteredStateIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid

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

  const orderCancelHandler = () => {
    cartContext.clearCart()
  }

  return (
    <div className='checkout-container'>
      <div>
        <p>{`Your Cart Total : $ ${cartCheckoutAmount}`}</p>
        <form onSubmit={submitHandler}>
          <div>
            <label>Name</label>
            <br />
            <input type='text' ref={nameInputRef} value={username} required />
          </div>
          <div>
            <label for='email'>Email</label>
            <br />
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
            {!isValid.address && <p>please enter address</p>}
          </div>
          <div>
            <label>State</label>
            <br />
            <input ref={stateInputRef} />
            {!isValid.state && <p>enter valid state</p>}

            <br />

            <label>City</label>
            <br />
            <input ref={cityInputRef} />
            {!isValid.city && <p>enter valid city</p>}

            <br />

            <label>Pin Code</label>
            <br />
            <input ref={postalInputRef} />
            {!isValid.postal && <p>enter valid pincode</p>}
          </div>
          <div className='flex-sb'>
            <button
              className='btn checkout-btn cancel-btn'
              type='button'
              onClick={orderCancelHandler}
            >
              Cancel Order
            </button>
            <button className='btn checkout-btn order-btn'>Place Order</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
