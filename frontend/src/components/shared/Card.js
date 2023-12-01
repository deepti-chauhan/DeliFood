import React, { useEffect, useState } from 'react'
import '../styles/Card.css'
import toast , { Toaster } from 'react-hot-toast'
// import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faHeart,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons'
import { addItem, removeItem } from '../../cartStore/cartActions/cartSlice'
import { useDispatch } from 'react-redux'

export const Card = ({ itemKey, filterItems }) => {
  const price = `${filterItems.price.toFixed(2)}`
  const [qty, setQty] = useState(filterItems.quantity)
  const dispatch = useDispatch()

  const addToCartHandler = async () => {
    const apidata = {
      productId: filterItems.productId,
      quantity: 1,
    }
    dispatch(addItem(apidata))
    setQty(qty + 1)
    toast.success('Item added to cart');
  }

  const removeFromCartHandler = async () => {
    dispatch(removeItem(filterItems.productId))
    setQty(qty - 1)
  }

  const notify = () => toast('Wow so easy!')

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
          <FontAwesomeIcon icon={faStar} />{' '}
          <span>{`(${filterItems.rating})`}</span>
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
            <button className='btn menu-item-btn' onClick={addToCartHandler}>
              ADD TO CART
            </button>
          ) : (
            <div className='menu-item-btn flex-sa'>
              <button
                className='btn item-counter-btn'
                onClick={addToCartHandler}
              >
                {' '}
                +{' '}
              </button>
              <p>{qty}</p>
              <button
                className='btn item-counter-btn'
                onClick={removeFromCartHandler}
              >
                {' '}
                -{' '}
              </button>
            </div>
          )}
        </div>
      </div>
      {/* {
        <ToastContainer
          position='bottom-right'
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
      } */}
    </>
  )
}

export default Card
