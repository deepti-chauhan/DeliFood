import { useEffect, useState } from 'react'
import './OrderHistory.css'
import env from 'react-dotenv'
import { Oval } from 'react-loader-spinner'
import Pagination from '../shared/Pagination'

const OrderHistory = () => {
  const token = localStorage.getItem('token')
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [totalPages, setTotalPages] = useState(0)

  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${env.BASE_URL}/api/order/history`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${token}`,
        },
      })
        .then((res) => res.json())
        .then((d) => setOrders(Object.values(d)))

      setTotalPages(Math.ceil(orders.length / itemsPerPage))
      console.log('response', orders)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  useEffect(() => {
    fetchOrders()
  }, [currentPage, itemsPerPage])

  const sortedOrders = orders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  const formatDate = (date) => {
    const originalDate = new Date(date)
    const options = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }
    const formattedDate = originalDate.toLocaleString('en-US', options)
    return formattedDate
  }

  const formatOrderId = (orderId) => {
    const originalString = orderId
    const parts = originalString.split('-')
    const extractedPart = parts[parts.length - 1]

    return extractedPart
  }

  return (
    <div className='order-cnt flex-center'>
      {isLoading && orders.length === 0 && (
        <div>
          <Oval
            height={80}
            width={80}
            color='#4fa94d'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor='#4fa94d'
            strokeWidth={2}
            strokeWidthSecondary={2}
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
              <div class='order-line-2 flex-sb'>
                <p>OrderID #{formatOrderId(item.orderId)}</p>
                <p>Delivered on {formatDate(item.createdAt)}</p>
              </div>
              {/* <div class='order-line-3'>YOUR ORDER</div> */}
              <div className='order-line-4'>
                {item.orderedItems.map((i) => (
                  <div className='ordered-item-container '>
                    <div className='flex-sb'>
                      <p>
                        {i.name} X {i.quantity}
                      </p>
                      <p>{` price : $ ${i.price}`}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div class='order-line-5'> </div>
              <div class='order-line-6'> Total Paid : ${item.orderTotal}</div>
              <div class='order-line-7'>
                <div className=''>
                  <button className='btn '>REORDER</button>
                  {/* <button className='btn '>DETAILS</button> */}
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}

export default OrderHistory
