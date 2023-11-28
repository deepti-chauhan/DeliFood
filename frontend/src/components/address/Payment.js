import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useGlobalCartContext } from '../../store/CartProvider'
import './style/payment.css'
import {loadStripe} from '@stripe/stripe-js';
import env from 'react-dotenv'

const Payment = ({ selectedAddress, setPayments }) => {
  const cartCtx = useGlobalCartContext()
  const cartTotal = cartCtx.totalAmount.toFixed(2)
  const token = localStorage.getItem('token')

  const onClickHandler = () => {
    setPayments(false)
  }

  //payment integration
  const paymentHandler = async() => {

    const stripe = await loadStripe("pk_test_51OH1UASAYSPowgwnRwYxrzV1HHrnOeNp8GbRKXDHVFj6BgM5VPoSS1kOJcUKfnCdhI3zaN8QsTHZdx7QMLbQriQA00loWo6ZLZ") 

    const body = {
      products : cartCtx.items,
      total : cartTotal
    }

    const headers = {
      'Content-type' : 'application/json',
      'Authorization' : token
    }

    const response = await fetch(`${env.BASE_URL}/api/create-checkout-session`,{
      method : 'POST',
      body   : JSON.stringify(body),
      headers : headers
    })

    const session = await response.json()

    const result = stripe.redirectToCheckout({
      sessionId:session.id 
    })

    if(result.error){
      console.log(result.error)
    }
  }
  

  return (
    <div>
      <div className='flex-sb'>
        <div>
          <p>
            Deliver at <FontAwesomeIcon icon={faLocationDot} />
          </p>
          <p>{`${selectedAddress.addressLocation}`}</p>
          <p>
            {` 
          ${selectedAddress.city},
          ${selectedAddress.state},
          ${selectedAddress.postalCode}`}
          </p>
        </div>
        <div>
          <button className='btn main-btn' onClick={onClickHandler}>
            Change
          </button>
        </div>
      </div>
      <div className='payment-btn-container flex-center'>
        <Link to='/payments'>
          <button className='btn payment-btn' onClick={paymentHandler}>PAY ${cartTotal}</button>
        </Link>
      </div>
    </div>
  )
}

export default Payment
