import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import './OrderHistory.css'
import env from 'react-dotenv'

const OrderHistory = () => {
  const token = localStorage.getItem('token')
  const [orders, setOrders] = useState([])
  const [isEmpty, setIsEmpty] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const { email } = JSON.parse(localStorage.getItem('user'))

  const fetchOrders = async () => {
    try {
      await fetch(`${env.BASE_URL}/api/order/history`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${token}`,
        },
      })
        .then((res) => res.json())
        .then((d) => setOrders(Object.values(d)))
      console.log({ orders })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchOrders()
  }, [])

  // const sortedOrders = orders.sort(
  //   (a, b) => new Date(b.user.createdAt) - new Date(a.user.createdAt)
  // )

  return (
    <div className='flex-center'>
      {/* {isEmpty && <FontAwesomeIcon icon={faBagShopping} />} */}
      <div className='order-wrapper flex-center'>
        {isLoading && <p>Loading...</p>}
        <div className='item-wrapper '>
          {orders.map((item) => (
            <div className='item-box flex-center'>
              {item.orderedItems.map((i) => (
                <div>
                  <p>{`${i.name}`}</p>
                  <p>{`Qty : ${i.quantity}`}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">{`price : $ ${i.price}`}</p>
                </div>
              ))}

              <div>
                shipping Address :
                <p>
                  {item.shippingAddress[0].address[0].addressType}
                  {item.shippingAddress[0].address[0].addressLocation}
                  {item.shippingAddress[0].address[0].city}
                  {item.shippingAddress[0].address[0].State}
                  {item.shippingAddress[0].address[0].postalCode}
                </p>
              </div>
              <p>Total Paid : ${item.orderTotal}</p>
              <p>{`Date :${item.createdAt}`}</p>
              <button className='btn main-btn'>reorder</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
