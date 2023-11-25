import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useGlobalCartContext } from '../../store/CartProvider'
import './style/payment.css'

const Payment = ({ selectedAddress, setPayments }) => {
  const cartCtx = useGlobalCartContext()
  const cartTotal = cartCtx.totalAmount.toFixed(2)

  const onClickHandler = () => {
    setPayments(false)
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
          <button className='btn payment-btn'>PAY ${cartTotal}</button>
        </Link>
      </div>
    </div>
  )
}

export default Payment
