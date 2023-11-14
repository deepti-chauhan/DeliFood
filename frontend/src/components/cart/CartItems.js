import React, { useState } from 'react'
import CartItem from './CartItem'
import { useGlobalCartContext } from '../../store/CartProvider'

const CartItems = (props) => {
  const cartContext = useGlobalCartContext()
  const hasItems = cartContext.items.length > 0
  // const [isCheckout, setIsDetails] = useState(false)

  const orderHandler = () => {
    props.setIsCheckout(true)
    props.setIsCartItem(false)
  }
  return (
    <div>
      <div className='cart-items flex-center'>
        {props.cartItems.map((item) => (
          <CartItem {...item} />
        ))}
      </div>
      <div className='cart-total-container'>
        <div className='cart-total'>
          {hasItems && (
            <div className='amount-box flex-center'>
              <div className='flex-sb'>
                <p>Cart total</p>
                <p> $ {cartContext.totalAmount.toFixed(2)}</p>
              </div>
              <button onClick={orderHandler} className='btn'>
                Proceed 
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartItems
