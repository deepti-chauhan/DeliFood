import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import './OrderHistory.css'
import env from 'react-dotenv'
import { Bars } from 'react-loader-spinner'

const OrderHistory = () => {
  const token = localStorage.getItem('token')
  const [orders, setOrders] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${env.BASE_URL}/api/order/history`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${token}`,
        },
      })
        .then((res) =>  res.json())
        .then((d) => setOrders(Object.values(d)))



      console.log("response", orders)

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchOrders()
  }, [])

  const sortedOrders = orders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  return (
    <div className='flex-center'>
      <div className='order-wrapper flex-center'>
        {isLoading && orders.length === 0 && (
          <div>
            <Bars
              height='80'
              width='80'
              color='#1E3050'
              ariaLabel='bars-loading'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
            />
          </div>
        )}

        {!isLoading && orders.length === 0 && (
          <div>
            {/* <img src={`${env.BASE_URL}/img/empty-box.png`} width={150} /> */}
            <img src={`./assets/empty-box.png`} width={150} />
            <p>No order placed yet</p>
          </div>
        )}
        {orders.length !== 0 && (
          <div className='item-wrapper flex-center'>
            {sortedOrders.map((item) => (
              <div className='order'>
                <div class='order-line-1'> </div>
                <div class='order-line-2'>Delivered on {item.createdAt}</div>
                <div class='order-line-3'>YOUR ORDER</div>
                <div className='order-line-4'>
                  {item.orderedItems.map((i) => (
                    <div className='ordered-item-container '>
                      <div className='flex-sb'>
                        <p>
                          {i.name} X {i.quantity}
                        </p>
                        <p>{` price : Rs ${i.price}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div class='order-line-5'> </div>
                <div class='order-line-6'> Total Paid : ${item.orderTotal}</div>
                <div class='order-line-7'>
                  <div className='flex-se'>
                    <button className='btn main-btn'>REORDER</button>
                    <button className='btn main-btn'>DETAILS</button>
                  </div>
                </div>
                {/* <div>
                shipping Address :
                <p>
                  {item.shippingAddress[0].address[0].addressType}
                  {item.shippingAddress[0].address[0].addressLocation}
                  {item.shippingAddress[0].address[0].city}
                  {item.shippingAddress[0].address[0].State}
                  {item.shippingAddress[0].address[0].postalCode}
                </p>
              </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory
