import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../store/CartContext'
import CartItem from '../components/cart/CartItem'
import Checkout from './Checkout'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../components/shared/Modal'
import Footer from '../components/shared/Footer'
import env from 'react-dotenv'
import CartItems from '../components/cart/CartItems'
import PersonalDetails from '../components/cart/PersonalDetails'
import Payment from '../components/cart/Payment'
import { useGlobalCartContext } from '../store/CartProvider'

const Cart = () => {
  const cartContext = useGlobalCartContext()
  const navigate = useNavigate()

  const [isEmpty, setIsEmpty] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isCheckout, setIsCheckout] = useState(false)
  const [isCartItem, setIsCartItem] = useState(true)
  const [isDetails, setIsDetails] = useState(false)
  const [isPayments, setIsPayments] = useState(false)


  const hasItems = cartContext.items.length > 0
  const cartItems = cartContext.items

  const checkIsEmpty = () => {
    console.log('checking empty ...')
    try {
      if (cartItems.length === 0) {
        setIsEmpty(true)
        setIsDetails(false)
        console.log('cart is empty')
      } else {
        setIsEmpty(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const orderHandler = () => {
    setIsDetails(true)
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

  const emptyCartHandler = () => {
    navigate('/menu')
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
        <div className='empty-cart-container'>
          {isEmpty && (
            <div className='flex-center'>
              <img src='/assets/shopping-cart.gif' width='300' />
              <p>
                Your Cart is Empty <Link to='/menu'> Discover Menu</Link>
              </p>
              <button className='btn' onClick={emptyCartHandler}>
                Discover menu
              </button>
            </div>
          )}
        </div>

        <div className='cart-container flex-center'>
          {!isEmpty && (
            <div className='cart-header flex'>
              <p>Cart Items</p>
              <p>Personal Details</p>
              <p>Payment</p>
              <p>Confirmation</p>
            </div>
          )}
          <div className='cart-wrapper'>
            {!isEmpty && (
              // <div>
              //   <div className='cart-items flex-center'>
              //     {cartItems.map((item) => (
              //       <CartItem {...item} setIsCheckout={setIsCheckout}/>
              //     ))}
              //   </div>
              //   <div className='cart-total-container'>
              //     {/* {!isCheckout && ( */}
              //       <div className='cart-total'>
              //         {hasItems && (
              //           <div className='amount-box flex-center'>
              //             <div className='flex-sb'>
              //               <p>Cart total</p>
              //               <p> $ {cartContext.totalAmount.toFixed(2)}</p>
              //             </div>
              //             <div></div>
              //             <button onClick={orderHandler} className='btn'>
              //               Proceed to Checkout
              //             </button>
              //           </div>
              //         )}
              //       </div>
              //     {/* )} */}
              //   </div>
              // </div>

              <div>
                {isCartItem && (
                  <CartItems
                    cartItems={cartItems}
                    setIsCheckout={setIsDetails}
                    setIsCartItem={setIsCartItem}
                  />
                )}
                {isDetails && (
                  <PersonalDetails
                    setIsDetails={setIsDetails}
                    setIsPayments={setIsPayments}
                    setIsCartItem={setIsCartItem}
                  />
                )}
                {isPayments && (
                  <Payment
                    setIsDetails={setIsDetails}
                    setIsPayments={setIsPayments}
                    setIsCheckout={setIsCheckout}
                    />
                    )}
                {isCheckout && <Checkout onConfirm={submitOrderHandler} 
                    setIsPayments={setIsPayments}
                    setIsCheckout={setIsCheckout}
                
                />}
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
