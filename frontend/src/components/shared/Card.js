import React, { useEffect, useState } from 'react'
import '../styles/Card.css'
import { useGlobalCartContext } from '../../store/CartProvider'
import { useDispatch } from 'react-redux'
import { addItem } from '../../cartStore/cartActions/cartSlice'
import env from 'react-dotenv'

export const Card = ({ itemKey, filterItems }) => {
  // const cartContext = useGlobalCartContext()
  // const price = `${filterItems.price.toFixed(2)}`
  // const [qty, setQty] = useState(0)
  // const [item, setItem] = useState()
  // const token = localStorage.getItem('token')

  // const addItemtoCart = () => {
  //   cartContext.addItem({
  //     id: filterItems.id,
  //     name: filterItems.name,
  //     quantity: 1,
  //     price: filterItems.price,
  //     image: filterItems.img,
  //   })
  // }

  // const removeItemfromCart = () => {
  //   cartContext.removeItem(filterItems.id)
  // }

  // const addToCart = async () => {
  //   // setQty(qty + 1)
  //   try {
  //     const response = await fetch(`${env.BASE_URL}/api/cart/addItem`, {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         productId: filterItems.productId,
  //         quantity: 1,
  //       }),
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `${token}`,
  //       },
  //     })
  //     const data = await response.json()
  //     setQty(Object.values(data))
  //     // setItem(data)
  //     console.log('Item added to cart:', Object.values(data))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const removeFromCart = async () => {
  //   // setQty(qty - 1)
  //   try {
  //     const response = await fetch(
  //       `${env.BASE_URL}/api/cart/removeItemByOne?productId=${filterItems.productId}`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-type': 'application/json',
  //           Authorization: `${token}`,
  //         },
  //       }
  //     )

  //     const data = await response.json()
  //     // setItem(data)
  //     setQty(Object.values(data))
  //     console.log('Item removed to cart:', Object.values(data))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const dispatch = useDispatch()


  const handleAddToCart = () => {
    try {

      const data = {
        productId : filterItems.productId,
        quantity : 1, 
      }
      dispatch(addItem(data))
    } catch (error) {
      console.error('Error in adding to cart ', error)
    }
  }

  return (
    <>
      <div key={itemKey} className='card flex'>
        <div className='card-img-container flex'>
          <img className='card-img' src={filterItems.img} />
        </div>
        <div className='card-title'>{filterItems.name}</div>
        <div className='card-title'>${filterItems.price}</div>
        <div key={itemKey} className='flex-center cart-add-item'>
          <div>
            <button className='btn menu-item-btn' onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>

          {/* {qty == 0 ? (
            <button className='btn menu-item-btn' onClick={addToCart}>
              ADD
            </button>
          ) : (
            <div className='flex-sa add-item-counter'>
              <button className='add-item-btn' onClick={ () => dispatch(addToCart(item))}>
                +
              </button>
              {qty}
              <button className='add-item-btn' onClick={() => dispatch(removeFromCart)}>
                -
              </button>
            </div>
          )} */}
        </div>
      </div>
    </>
  )
}

export default Card
