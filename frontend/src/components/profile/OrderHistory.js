import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import './OrderHistory.css'
import env from 'react-dotenv'
const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [isEmpty, setIsEmpty] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
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
    }finally{
      setIsLoading(false);
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
      {/* {isEmpty && <FontAwesomeIcon icon={faBagShopping} />} */}
      <div className='order-wrapper flex-center'>
      {isLoading && <p>Loading...</p>}
        <div className='item-wrapper '>
          {sortedOrders.map((item) => (
            <div className='item-box flex-center'>
              <p>{`date : ${item.user.date}`}</p>

              {item.ordereditems.map((i) => (
                <div>
                  <p>{`${i.name}`}</p>
                  <p>{`Qty : ${i.quantity}`}</p>
                  <p>{`price : $ ${i.price}`}</p>
                  <p>
                    <button className='btn main-btn'>reorder</button>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
