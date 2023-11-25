import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { fetchCart } from '../cartStore/cartActions/cartSlice'

const Cart = () => {
  const cartContext = useGlobalCartContext()
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const [isEmpty, setIsEmpty] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isCheckout, setIsCheckout] = useState(false)
  const [cart, setCart] = useState([])
  // const dispatch = useDispatch()

  const hasItems = cartContext.items.length > 0
  // const cart = cartContext.items

  const checkIsEmpty = () => {
    console.log('checking empty ...')
    try {
      if (cart.length === 0) {
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

  // const fetchCart = async () => {
  //   try {
  //     await fetch(`${env.BASE_URL}/api/cart/items`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `${token}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((d) => setCart(Object.values(d)))

  //     console.log(cart[1])
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const submitOrderHandler = async (userData) => {
  //   await fetch(`${env.BASE_URL}/api/orders`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       user: userData,
  //       ordereditems: cartContext.items,
  //     }),
  //   })
  //   setShowModal(true)
  //   cartContext.clearCart()
  // }

  // const cartData = useSelector(state => state.cart.items)
  // console.log("cart state : ", cartData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCart)
    // checkIsEmpty()
  }, [])

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
                  {<Address />}
                  {/* <Checkout onConfirm={submitOrderHandler} />{' '} */}
                </div>
              )}

              {!isCheckout && (
                <div className='cart-items'>
                  {cart[1].map((item) => (
                    <CartItem key={item.productId} {...item} />
                  ))}
                </div>
              )}
              <div className='cart-total-container'>
                <div className='cart-total'>
                  <div className='amount-box flex-center'>
                    <div className='flex-sb'>
                      <p>Cart total</p>
                      <p> $ {cart[2]} </p>
                    </div>
                    <div></div>
                    {!isCheckout && (
                      <button onClick={orderHandler} className='btn'>
                        CHECKOUT
                      </button>
                    )}
                  </div>
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
