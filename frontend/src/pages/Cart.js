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

  const submitOrderHandler = async (userData) => {
    await fetch(`${env.BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userData,
        ordereditems: cartContext.items,
      }),
    })
    setShowModal(true)
    cartContext.clearCart()
  }

  useEffect(() => {
    checkIsEmpty()
  }, [cartItems.length])

  const closeModal = () => {
    setShowModal(false)
    navigate('/')
  }

  const orderStatus = (
    <div>
      <div>
        <img src='./assets/online-shopping.gif' width='300' />
      </div>
      <h2>Order Placed</h2>
    </div>
  )
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
                  {<Address/>}
                  {/* <Checkout onConfirm={submitOrderHandler} />{' '} */}
                </div>
              )}

              {!isCheckout && (
                <div className='cart-items'>
                  {cartItems.map((item) => (
                    <CartItem {...item} />
                  ))}
                </div>
              )}
              <div className='cart-total-container'>
                <div className='cart-total'>
                  {hasItems && (
                    <div className='amount-box flex-center'>
                      <div className='flex-sb'>
                        <p>Cart total</p>
                        <p> Rs. {cartContext.totalAmount.toFixed(2)}</p>
                      </div>
                      <div className='flex-sb'>
                        <p>Delivery Charge</p>
                        <p> Rs. 50</p>
                      </div>

                      <div></div>
                      <button onClick={orderHandler} className='btn'>
                        CHECKOUT
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='flex-center'>
          {showModal && <Modal onClose={closeModal}>{orderStatus}</Modal>}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart
