import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import env from 'react-dotenv'
import Loader from '../shared/Loader'
import './AddressBook.css'
import { Bars } from 'react-loader-spinner'

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
          Authorization: `${token}`,
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
      {isLoading && (
        <Bars
          height='80'
          width='80'
          color='#4fa94d'
          ariaLabel='bars-loading'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
          />
      )}
      <div className='wrapper'>
        <div className='address-wrapper'>
          {address.map((item) => (
            <div className='address-box '>
              <div class='address-line-1'>
                <FontAwesomeIcon icon={faLocationDot} />{' '}
              </div>
              <div class='address-line-2'>{item.addressType}</div>
              <div class='address-line-3'>
                {item.addressLocation}, {item.state},{item.city}
                <br />
                {`pincode : ${item.postalCode}`}
              </div>
              <div class='address-line-4'>
                <button className='btn del-btn'>DELETE</button>{' '}
                <button className='btn main-btn del-btn'>EDIT</button>{' '}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddressBook
