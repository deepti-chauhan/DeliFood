import CartItem from '../components/cart/CartItem'
import Footer from '../components/shared/Footer'
import Address from '../components/address/Address'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Oval } from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCart } from '../cartStore/cartActions/cartSlice'
import { scrollToTop } from '../Util/scroll'

const Cart = () => {
  const [isCheckout, setIsCheckout] = useState(false)

  useEffect(() => {
    scrollToTop()
    dispatch(fetchCart())
  }, [])

  let delivery
  let total
  let discount

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const cartTotal = cart.totalAmount

  delivery = cartTotal > 15 ? 0 : 3.99
  discount = cartTotal > 100 ? 15 : 0
  total = parseFloat(cartTotal) + parseFloat(delivery) - parseFloat(discount)
  total = total.toFixed(2)

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
                <button
                  onClick={() => {
                    navigate('/menu')
                  }}
                >
                  DISCOVER MENU{' '}
                  <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
        )}

        {!cart.loading && cart.items.length !== 0 && (
          <div className='cart-container flex-center'>
            <div className='cart-wrapper'>
              {isCheckout && (
                <div className='cart-items'>
                  {<Address setIsCheckout={setIsCheckout} />}
                </div>
              )}

              {!isCheckout && (
                <div className='cart-items'>
                  {cart.items.map((item) => (
                    <CartItem key={item.productId} {...item} />
                    ))}
                    <div className='cart-item-footer'>
                      <i><b>* free delivery on all orders above $15</b></i>
                    </div>
                </div>
              )}

              <div className='cart-total-container'>
                <div className='price-details flex-sb'>
                  <p>Discounts</p>
                  <a>Apply discount</a>
                </div>

                <div className='price-details'>
                  <div className='flex-sb'>
                    <p>Order value</p>
                    <p>$ {cartTotal}</p>
                  </div>
                  <div className='flex-sb'>
                    <p id ='discount'>Discount</p>
                    <p id ='discount'> - $ {discount}</p>
                  </div>
                  <div className='flex-sb'>
                    <p>Delivery</p>
                    <p>$ {delivery}</p>
                  </div>
                </div>

                <div className='price-details flex-sb'>
                  <h4>Total</h4>
                  <h4>$ {total} </h4>
                </div>
                <div className='price-details'>
                  {!isCheckout && (
                    <button
                      className='btn checkout-btn'
                      onClick={() => {
                        setIsCheckout(true)
                      }}
                    >
                      CHECKOUT
                    </button>
                  )}
                </div>
                  <i><b>* $15 discount on orders above $100</b> </i>
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
