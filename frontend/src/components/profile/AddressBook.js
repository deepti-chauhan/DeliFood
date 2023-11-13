import { useState, useEffect } from 'react'
import './AddressBook.css'
import env from 'react-dotenv'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const AddressBook = () => {
  const [address, setAddress] = useState([])
  const { email } = JSON.parse(localStorage.getItem('user'))
  const [isLoading, setIsLoading] = useState(false)

  const fetchAddress = async () => {
    setIsLoading(true)
    try {
      const addressData = await fetch(`${env.BASE_URL}/api/address`, {
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

  const uniqueAddress = []
  const uniqueLocality = []

  address.forEach((item) => {
    const newLocality = item.user.address.locality
    const newAddress = item.user.address
    if (!uniqueLocality.includes(newLocality)) {
      uniqueLocality.push(newLocality)
      uniqueAddress.push(newAddress)
    }
  })
  console.log(uniqueAddress)

  return (
    <div className='flex-center'>
      <div className='wrapper'>
        <div className='address-wrapper'>
          {uniqueAddress.map((item) => (
            <div className='address-box'>
              <div class='address-line'>{item.locality}</div>
              <div class='address-line'>
                <p>{item.state}</p>
                <p>{item.city}</p>
                <p>
                {`pincode : ${item.postal}`}
                </p>
              </div>
              {/* <div class='address-line'></div> */}
              {/* <div class='address-line'></div> */}
              <div className='address-line edit-btn flex-sb'>
                <button className='btn'>
                  <FontAwesomeIcon icon={faPenToSquare} />
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
