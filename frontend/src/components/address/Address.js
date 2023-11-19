import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import Modal from '../shared/Modal'
import AddressForm from './AddressForm'
import Payment from './Payment'
import './style/address.css'

const Address = () => {
  const [showModal, setShowModal] = useState(false)
  const [address, setAddress] = useState([])
  const [selectedAddress, setSelectedAddress] = useState([])
  const [payment, setPayments] = useState(false)
  const { email } = JSON.parse(localStorage.getItem('user'))

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

  //@ post api
  const fetchAddress = async () => {
    try {
      return await fetch('http://localhost:5000/api/alladdress', {
        method: 'POST',
        body: JSON.stringify({ email: email }),
        headers: {
          'Content-type': 'application/json',
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

  console.log(address)

  return (
    <div>
      <div>
        {!payment && (
          <div>
            <h3>Choose a delivery address</h3>
            <div className='delivery-address-container'>
              {address.map((d) => (
                <div key={d._id} className='delivery-address-box solid-box flex'>
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
    </div>
  )
}

export default Address
