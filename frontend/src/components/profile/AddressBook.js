import React, { useState, useEffect } from 'react'

const AddressBook = () => {
  const [address, setAddress] = useState([])
  const { email } = JSON.parse(localStorage.getItem('user'))
  const currentUserEmail = email

  const fetchAddress = async () => {
    try {
      const result = await fetch('http://localhost:5000/api/orderhistory', {
       method:'GET',
       body : JSON.stringify(currentUserEmail),
      }).then((res) => res.json()).then((d) => setAddress(d))

      const { user } = await result.json()
      // // setAddress(Object.values(result))
      // setAddress(user)
      console.log(`user : ${user}`)
      // console.log(`address : ${address}`)
      // return result
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // fetchAddress()
  })
  return (
    <div>
      AddressBook
      <div></div>
    </div>
  )
}

export default AddressBook
