import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import env from 'react-dotenv'
import Loader from '../shared/Loader'
import './AddressBook.css'

const AddressBook = () => {
  const token = localStorage.getItem('token')
  
  const [address, setAddress] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchAddress = async () => {
    setIsLoading(true)
    try {
      const addressData = await fetch(`${env.BASE_URL}/api/alladdress`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `${token}`,
        },
      })
        .then((res) => res.json())
        .then((d) => setAddress(Object.values(d)))
      console.log(address)

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
      {isLoading && <Loader />}
      <div className='wrapper'>
        <div className='address-wrapper'>
          {address.map((item) => (
            <div className='address-box'>
              <FontAwesomeIcon icon={faLocationDot} />
              <div className='address-line'>{item.addressType}</div>
              <div className='address-line'>{item.addressLocation}</div>
              <div className='address-line'>
                <p>{item.state}</p>
                <p>{item.city}</p>
                <p>{`pincode : ${item.postalCode}`}</p>
              </div>
              <div className='address-line flex-sb'>
                <button className='btn main-btn edit-btn'>EDIT</button>
                <button className='btn main-btn del-btn'>DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddressBook
