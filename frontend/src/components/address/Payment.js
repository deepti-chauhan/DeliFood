import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useGlobalCartContext } from '../../store/CartProvider'
import './style/payment.css'
import { loadStripe } from '@stripe/stripe-js'
import env from 'react-dotenv'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchCart } from '../../cartStore/cartActions/cartSlice'

const Payment = ({ selectedAddress, setPayments }) => {
  const cartCtx = useGlobalCartContext()
  const cartTotal = cartCtx.totalAmount.toFixed(2)
  const token = localStorage.getItem('token')

  const cart = useSelector((state) => state.cart)

  localStorage.setItem('addressId', selectedAddress.addressId)

  const onClickHandler = () => {
    setPayments(false)
  }

  //payment integration
  const paymentHandler = async () => {
    try {
      const stripe = await loadStripe(
        'pk_test_51OH1UASAYSPowgwnRwYxrzV1HHrnOeNp8GbRKXDHVFj6BgM5VPoSS1kOJcUKfnCdhI3zaN8QsTHZdx7QMLbQriQA00loWo6ZLZ'
      )

      const body = {
        products: cart.items,
        total: cart.totalAmount,
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
        /* Read more about handling dismissals below */
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
        console.log(result.error)
        // Display an error message using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.',
        })
      }
    } catch (error) {
      console.error('Error creating checkout session:', error.message)
      // Display an error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'payment error',
        text: 'Something went wrong! Please try again later.',
      })
    }
  }

  return (
    <div>
      <div className='flex-center'>
        <div>
          <div class='parent'>
            <div class='div1'>
              Deliver at <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div class='div2'>
              <button className='btn main-btn' onClick={onClickHandler}>
                Change
              </button>
            </div>
            <div class='div3'>
              <p>{`${selectedAddress.addressLocation}`}</p>
              <p>
                {` 
          ${selectedAddress.city},
          ${selectedAddress.state}`}
              </p>
              <p>pincode - {selectedAddress.postalCode}</p>
            </div>
            <div class='div4'>
              <button className='btn payment-btn' onClick={paymentHandler}>
                PAY Rs {cart.totalAmount}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
