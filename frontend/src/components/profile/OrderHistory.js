import { useEffect, useState } from 'react'
import './OrderHistory.css'
import env from 'react-dotenv'
const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const { email } = JSON.parse(localStorage.getItem('user'))

  const fetchOrders = async () => {
    try {
      await fetch(`${env.BASE_URL}/api/orderhistory`, {
        method: 'POST',
        body: JSON.stringify({ email: email }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((d) => setOrders(Object.values(d)))
      console.log({ orders })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchOrders()
  }, [])

  const sortedOrders = orders.sort(
    (a, b) => new Date(b.user.date) - new Date(a.user.date)
  )

  console.log(sortedOrders)

  return (
    <div className='flex-center'>
      <div className='order-wrapper flex-center'>
        <div className='item-wrapper flex-center'>
          {sortedOrders.map((item) => (
            <div className='item-box flex-se'>
              <p className='flex-center'>
                <img src={item.ordereditems[0].image} width={50} />
              </p>
              <p>{`${item.ordereditems[0].name}`}</p>
              <p>{`Qty : ${item.ordereditems[0].quantity}`}</p>
              <p>{`price : $ ${item.ordereditems[0].price}`}</p>
              <p>{`date : ${item.user.date}`}</p>
              <p>
                <button className='btn main-btn'>reorder</button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
