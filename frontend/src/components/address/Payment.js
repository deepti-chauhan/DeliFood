import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons'
import { loadStripe } from '@stripe/stripe-js'
import { useSelector } from 'react-redux'
import env from 'react-dotenv'
import Swal from 'sweetalert2'
import './style/payment.css'
import { useState } from 'react'
import { Oval } from 'react-loader-spinner'

const Payment = ({ selectedAddress, setPayments }) => {
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('token')
  const cart = useSelector((state) => state.cart)

  localStorage.setItem('addressId', selectedAddress.addressId)

  let delivery
  let total
  let discount

  const cartTotal = cart.totalAmount

  delivery = cartTotal > 15 ? 0 : 3.99
  discount = cartTotal > 100 ? 15 : 0
  total = parseFloat(cartTotal) + parseFloat(delivery) - parseFloat(discount)
  total = total.toFixed(2)

  //payment integration
  const paymentHandler = async () => {
    setLoading(true)
    try {
      const stripe = await loadStripe(
        'pk_test_51OH1UASAYSPowgwnRwYxrzV1HHrnOeNp8GbRKXDHVFj6BgM5VPoSS1kOJcUKfnCdhI3zaN8QsTHZdx7QMLbQriQA00loWo6ZLZ'
      )

      const body = {
        products: cart.items,
        total: total,
      }

      const headers = {
        'Content-type': 'application/json',
        Authorization: token,
      }

      const response = await fetch(
        `${env.BASE_URL}/api/create-checkout-session`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: headers,
        }
      )

      let timerInterval

      Swal.fire({
        title: 'Redirecting to Payment',
        html: ' wait for <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,

        didOpen: () => {
          Swal.showLoading()
          const timer = Swal.getPopup().querySelector('b')
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })

      if (!response.ok) {
        throw new Error(
          `Failed to create checkout session. Status: ${response.status}`
        )
      }

      const session = await response.json()

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.',
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'payment error',
        text: 'Something went wrong! Please try again later.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='flex-center'>
        <div>
          <div class='parent'>
            <div class='div1'>
              <button
                className='btn back-to-cart-btn'
                onClick={() => {
                  setPayments(false)
                }}
              >
                <FontAwesomeIcon icon={faArrowCircleLeft} /> back to address
              </button>
            </div>
            {/* <div class='div2'></div> */}
            <div class='div3'>
              <p>
                Deliver at <FontAwesomeIcon icon={faLocationDot} />
              </p>
              <p>{`${selectedAddress.addressLocation}`}</p>
              <p>{` ${selectedAddress.city},${selectedAddress.state}`}</p>
              <p>pincode - {selectedAddress.postalCode}</p>
            </div>
            <div class='div4'>
              <button
                className='btn payment-btn flex-center'
                onClick={paymentHandler}
              >
                {loading ? (
                  <div>
                    <Oval
                      height={30}
                      width={30}
                      color='#efefef'
                      wrapperStyle={{}}
                      wrapperClass=''
                      visible={true}
                      ariaLabel='oval-loading'
                      secondaryColor='#00000d'
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  </div>
                ) : (
                  `PAY ${total}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
