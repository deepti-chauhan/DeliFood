import React from 'react'
import { useGlobalCartContext } from '../../store/CartProvider'

const Payment = (props) => {

  const cartCtx = useGlobalCartContext() 
  // const currUser = cartCtx.user
  const paymentHandler = () => {
    props.setIsDetails(true)
    props.setIsPayments(false)
  }

  const checkoutHandler = () => {
    props.setIsPayments(false)
    props.setIsCheckout(true)
  }

  return (
    <div>
      {/* {`Choose Payment Method for ${currUser}`} */}
      <button onClick={paymentHandler} className='btn checkout-btn order-btn'>
        Go Back
      </button>
      <button onClick={checkoutHandler} className='btn checkout-btn order-btn'>
        Checkout
      </button>
    </div>
  )
}

export default Payment
