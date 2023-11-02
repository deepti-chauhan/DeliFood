import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../store/CartContext'
import CartItem from '../components/cart/CartItem'
import Checkout from './Checkout'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/shared/Modal'
import Footer from '../components/shared/Footer'

const Cart = (props) => {
  const cartContext = useContext(CartContext)
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
    await fetch( `${process.env.BASE_URL}/api/orders`, {
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

  const orderStatus = <p>order placed successfully!!</p>
  return (
    <div>
      <div className='container flex-center'>
        <div className='empty-cart-container'>
          <h2>{isEmpty && <img src='/img/empty_cart.png' />}</h2>
        </div>
        <div className='cart-container flex-sa'>
          <div className='cart-items'>
            {cartItems.map((item) => (
              <CartItem {...item} />
            ))}
          </div>
          <div className='cart-total-container'>
          {isCheckout && <Checkout onConfirm={submitOrderHandler} />}
          {!isCheckout && (
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
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          )}
          </div>
        </div>
        <div className='flex-center'>
          {showModal && <Modal onClose={closeModal}>{orderStatus}</Modal>}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart
