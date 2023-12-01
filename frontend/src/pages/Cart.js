import React, { useContext, useEffect, useState } from 'react'
import CartItem from '../components/cart/CartItem'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/shared/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Address from '../components/address/Address'
import {Oval} from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux'
import {
  addOrUpdateItem,
  addItem,
  fetchCart,
} from '../cartStore/cartActions/cartSlice'

const Cart = () => {
  const [isCheckout, setIsCheckout] = useState(false)

  const orderHandler = () => {
    setIsCheckout(true)
  }

  useEffect(() => {
    dispatch(fetchCart())
  }, [])

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const cartTotal = cart.totalAmount

  const navigate = useNavigate()

  return (
    <div>
      <div className='container flex-center'>
        {cart.loading && (
          <div>
            <Oval
              height={80}
              width={80}
              color='#4fa94d'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor='#4fa94d'
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )}
        {!cart.loading && cart.items.length === 0 && (
          <div className='empty-cart-container flex-center'>
            <div>
              <img src='/assets/shopping-cart.gif' width='300' />
              <div className='flex-center'>
                <button onClick={()=> {
                  navigate('/menu')
                }}>
                  DISCOVER MENU <FontAwesomeIcon icon={faArrowRight} ></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
        )}
        {!cart.loading && cart.items.length !== 0 && (
          <div className='cart-container flex-center'>
            <div className='cart-wrapper'>
              {isCheckout && <div className='cart-items'>{<Address />}</div>}

              {!isCheckout && (
                <div className='cart-items'>
                  {cart.items.map((item) => (
                    <CartItem key={item.productId} {...item} />
                  ))}
                </div>
              )}
              <div className='cart-total-container'>
                <div className='cart-total'>
                  <div className='amount-box flex-center'>
                    <div className='flex-sb'>
                      <p>Cart total</p>
                      <p> $ {cartTotal} </p>
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
      </div>
      <Footer />
    </div>
  )
}

export default Cart
