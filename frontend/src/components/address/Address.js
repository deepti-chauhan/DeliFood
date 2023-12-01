import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons'
import AddressForm from './AddressForm'
import Payment from './Payment'
import Modal from '../shared/Modal'
import env from 'react-dotenv'
import './style/address.css'

const Address = ({ setIsCheckout }) => {
  const [showModal, setShowModal] = useState(false)
  const [address, setAddress] = useState([])
  const [selectedAddress, setSelectedAddress] = useState([])
  const [payment, setPayments] = useState(false)

  const token = localStorage.getItem('token')

  const addAdressHandler = (
    <div>
      <p>add new address</p>
      <AddressForm setShowModal={setShowModal} setAddress={setAddress} />
    </div>
  )

  const addressHandler = (data) => {
    setSelectedAddress({ ...data })
    setPayments(true)
  }

  const onClose = () => {
    setShowModal(false)
  }

  //@ get api
  const fetchAddress = async () => {
    try {
      return await fetch(`${env.BASE_URL}/api/alladdress`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${token}`,
        },
      })
        .then((res) => res.json())
        .then((d) => setAddress(Object.values(d)))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchAddress()
  }, [])

  return (
    <>
      <div>
        {!payment && (
          <div className='shipping-address-container'>
            <h3>SHIPPING ADDRESS <FontAwesomeIcon icon={faLocationDot} /></h3>
            <button
              className='btn back-to-cart-btn'
              onClick={() => {
                setIsCheckout(false)
              }}
            >
              <FontAwesomeIcon icon={faArrowCircleLeft} /> back to cart
            </button>

            <div className='delivery-address-container'>
              {address.map((d) => (
                <div
                  key={d._id}
                  className='delivery-address-box solid-box flex'
                >
                  <div className='flex'>
                    <FontAwesomeIcon icon={faLocationDot} />

                    {d.addressType}
                  </div>
                  <p>
                    {d.addressLocation}, {d.city}, {d.state}
                    <br />
                    {d.postalCode}
                  </p>

                  <button
                    className='btn main-btn'
                    onClick={() => addressHandler({ ...d })}
                  >
                    SELECT
                  </button>
                </div>
              ))}

              <div className='delivery-address-box dotted-box flex'>
                <p>
                  <FontAwesomeIcon icon={faLocationDot} />
                  Add new address
                </p>
                <button
                  className='btn main-btn'
                  onClick={() => setShowModal(true)}
                >
                  Add new
                </button>
              </div>
            </div>
          </div>
        )}

        {showModal && <Modal onClose={onClose}>{addAdressHandler}</Modal>}
      </div>
      <div>
        {payment && (
          <Payment
            setPayments={setPayments}
            selectedAddress={selectedAddress}
          />
        )}
      </div>
    </>
  )
}

export default Address
