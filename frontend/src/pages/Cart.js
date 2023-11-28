import React, { useContext, useEffect, useState } from 'react'
import CartItem from '../components/cart/CartItem'
import Checkout from './Checkout'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../components/shared/Modal'
import Footer from '../components/shared/Footer'
import env from 'react-dotenv'
import { useGlobalCartContext } from '../store/CartProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Address from '../components/address/Address'

const Cart = () => {
  const cartContext = useGlobalCartContext()
  const navigate = useNavigate()

  const [isEmpty, setIsEmpty] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isCheckout, setIsCheckout] = useState(false)

  const hasItems = cartContext.items.length > 0
  const cartItems = cartContext.items

  const checkIsEmpty = () => {
    console.log('checking empty ...')
    try {
      if (cartItems.length === 0) {
        setIsEmpty(true)
        setIsCheckout(false)
        console.log('cart is empty')
      } else {
        setIsEmpty(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const orderHandler = () => {
    setIsCheckout(true)
  }


  useEffect(() => {
    checkIsEmpty()
  }, [cartItems.length])


  return (
    <div>
      <div className='container flex-center'>
        {isEmpty && (
          <div className='empty-cart-container flex-center'>
            <div>
              <img src='/assets/shopping-cart.gif' width='300' />
              <div className='flex-center'>
                <span>EMPTY CART</span>
                <span>
                  <Link to='/menu'>
                    DISCOVER MENU
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </span>
              </div>
            </div>
          </div>
        )}
        {!isEmpty && (
          <div className='cart-container flex-center'>
            <div className='cart-wrapper'>
              {isCheckout && (
                <div className='cart-items'>
                  {<Address />}
                </div>
              )}

              {!isCheckout && (
                <div className='cart-items'>
                  {cartItems.map((item) => (
                    <CartItem key={item.productId} {...item} />
                  ))}
                </div>
              )}
              <div className='cart-total-container'>
                <div className='cart-total'>
                  {hasItems && (
                    <div className='amount-box flex-center'>
                      <div className='flex-sb'>
                        <p>Cart total</p>
                        <p> $ {cartContext.totalAmount.toFixed(2)}</p>
                      </div>
                      <div></div>
                      {!isCheckout && (
                        <button onClick={orderHandler} className='btn'>
                          CHECKOUT
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

       
      </div>
      <Footer />
    </div>
  )
}

export default Cart
