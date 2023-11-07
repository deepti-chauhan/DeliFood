import { useState, useEffect } from 'react'
import './AddressBook.css'
import env from 'react-dotenv'

const AddressBook = () => {
  const [address, setAddress] = useState([])
  const { email } = JSON.parse(localStorage.getItem('user'))

  const fetchAddress = async () => {
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
        <p className='address-title'>Your Saved Address</p>
        <div className='address-wrapper flex-center'>
          {uniqueAddress.map((item) => (
            <div className='address-box'>
              <div class="address-line">{item.locality}</div>
              <div class="address-line">{item.state}</div>
              <div class="address-line">{item.city}</div>
              <div class="address-line">{`pincode : ${item.postal}`}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddressBook
