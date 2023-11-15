import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const Payment = (props) => {
  const onClickHandler = () => {
    props.setPayments(false)
  }

  return (
    <div>
          <button className='btn main-btn' onClick={onClickHandler}>
            go to address
          </button>
      <p>payment section</p>
      <div>
        <p>
          Deliver at <FontAwesomeIcon icon={faLocationDot} />
          <br />
          {`${props.selectedAddress.addressLocation}, 
          ${props.selectedAddress.city}, 
          ${props.selectedAddress.state},
          ${props.selectedAddress.postalCode}`}
        </p>
      </div>
      <button className='btn main-btn'>
        <Link to='/payments'>PAY</Link>
      </button>
    </div>
  )
}

export default Payment
