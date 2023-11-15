import { useState, useEffect } from 'react'
import './AddressBook.css'
import env from 'react-dotenv'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import Loader from '../shared/Loader'


const AddressBook = () => {
  const [address, setAddress] = useState([])
  const { email } = JSON.parse(localStorage.getItem('user'))
  const [isLoading, setIsLoading] = useState(false)

  const fetchAddress = async () => {
    setIsLoading(true)
    try {
      const addressData = await fetch(`${env.BASE_URL}/api/alladdress`, {
        method: 'POST',
        body: JSON.stringify({ email: email }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((d) => setAddress(Object.values(d)))
      console.log({ address })

      return addressData
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchAddress()
  }, [])


  return (
    <div className='flex-center'>
      {isLoading && <Loader/> }
      <div className='wrapper'>
        <div className='address-wrapper'>
          {address.map((item) => (
            <div className='address-box'>
              <FontAwesomeIcon icon={faLocationDot} />
              <div class='address-line'>{item.addressType}</div>
              <div class='address-line'>{item.addressLocation}</div>
              <div class='address-line'>
                <p>{item.state}</p>
                <p>{item.city}</p>
                <p>
                {`pincode : ${item.postalCode}`}
                </p>
              </div>
              <div className='address-line flex-sb'>
                <button className='btn main-btn edit-btn'>
                  EDIT
                </button>
                <button className='btn main-btn del-btn'>
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddressBook
