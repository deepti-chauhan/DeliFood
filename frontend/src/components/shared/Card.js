import React, { useEffect, useState } from 'react'
import '../styles/Card.css'
import { useGlobalCartContext } from '../../store/CartProvider'
import toast, { Toaster } from 'react-hot-toast'
import env from 'react-dotenv'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faHeart,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons'

export const Card = ({ itemKey, filterItems }) => {
  const cartContext = useGlobalCartContext()
  const price = `${filterItems.price.toFixed(2)}`
  const [qty, setQty] = useState(0)
  const token = localStorage.getItem('token')

  const addItemtoCartApi = async () => {
    try {
      await fetch(`${env.BASE_URL}/api/cart/addItem`, {
        method: 'POST',
        body: JSON.stringify({
          productId: filterItems.productId,
          quantity: 1,
        }),
        headers: {
          'Content-type': 'application/json',
          Authorization: `${token}`,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  const removeItemByOneFromCartApi = async () => {
    try {
      await fetch(
        `${env.BASE_URL}/api/cart/removeItemByOne?productId=${filterItems.productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `${token}`,
          },
        }
      )
    } catch (e) {
      console.log(e)
    }
  }

  const decreaseItemQuantity = () => {
    setQty(qty - 1)
    cartContext.removeItem(filterItems.productId)
    removeItemByOneFromCartApi()
  }

  const addItemtoCart = () => {
    setQty(qty + 1)
    cartContext.addItem({
      productId: filterItems.productId,
      name: filterItems.name,
      quantity: 1,
      price: filterItems.price,
      image: filterItems.img,
    })

    addItemtoCartApi()

    toast.success('item added successfully')
  }

  return (
    <>
      <Toaster position='bottom-left' reverseOrder={true} />
      <div key={itemKey} className='card flex'>
        <div className='card-img-container'>
          <img className='card-img' src={filterItems.img} width={200} />
        </div>
        <div className='card-rating'>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} /> <span>{`(${filterItems.rating})`}</span>
        </div>
        <div className='card-title'>{filterItems.name}</div>
        <div className='card-desc flex-sb'>
          <p className='card-price'>${price}</p>
          <p>
            <FontAwesomeIcon icon={faHeart} className='card-icon i-heart' />
            <FontAwesomeIcon
              icon={faShareNodes}
              className='card-icon i-share'
            />
          </p>
        </div>
        <div className='flex-center cart-add-item'>
          {qty === 0 ? (
            <button className='btn menu-item-btn' onClick={addItemtoCart}>
              ADD TO CART
            </button>
          ) : (
            <div className='menu-item-btn flex-sa'>
              <button className='btn item-counter-btn' onClick={addItemtoCart}>
                {' '}
                +{' '}
              </button>
              <p>{qty}</p>
              <button
                className='btn item-counter-btn'
                onClick={decreaseItemQuantity}
              >
                {' '}
                -{' '}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Card
