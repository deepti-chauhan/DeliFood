import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import env from 'react-dotenv'

const Success = () => {
  const navigate = useNavigate()
  const addressId = localStorage.getItem('addressId')
  const token = localStorage.getItem('token')

  const [order, setOrder] = useState()

  console.log('ADDRESS ID', addressId)

  const orderHandler = async () => {
    try {
      const response = await fetch(`${env.BASE_URL}/api/order/create/`, {
        method: 'POST',
        body: {
          addressId: addressId,
        },
        headers: {
          // 'Content-type': 'application/json',
          Authorization: token,
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      localStorage.removeItem('addressId')
    }
  }

  useEffect(() => {
    orderHandler()

    Swal.fire({
      icon: 'success',
      title: 'Order Placed',
      text: 'Your order will arrive in 30minuntes !',
    })

    navigate('/home')
  }, [])
}

export default Success
