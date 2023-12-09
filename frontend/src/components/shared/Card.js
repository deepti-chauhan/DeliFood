import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { addItem, removeItem } from '../../cartStore/cartActions/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import {
  faStar,
  faHeart,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons'
import '../styles/Card.css'
import Modal from './Modal'
import { useNavigate } from 'react-router-dom'

export const Card = ({ itemKey, filterItems }) => {
  const token = localStorage.getItem('token')
  const price = `${filterItems.price.toFixed(2)}`
  const [qty, setQty] = useState(token ? filterItems.quantity : 0)
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const addToCartHandler = async () => {
    const apidata = {
      productId: filterItems.productId,
      quantity: 1,
    }

    if (!token) {
      toast.error('Login to add item')
    } else {
      dispatch(addItem(apidata))
      setQty(qty + 1)
      toast.success('Item added to cart')
    }
  }

  const removeFromCartHandler = async () => {
    if (!token) {
      toast.error('Login to add item')
    } else {
      dispatch(removeItem(filterItems.productId))
      setQty(qty - 1)
      toast.success('Item removed from cart')
    }
  }

  const modalContent = (
    <div class='product-card'>
      <div class='product-card-div1 flex'>
        <img src={filterItems.img} width={250} />
      </div>
      <div class='product-card-div2 flex-center'>
        <p>
          <b>{filterItems.name}</b>
        </p>
        <p>$ {filterItems.price}</p>
        <p className='card-rating'>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />{' '}
          <span>{`(${filterItems.rating})`}</span>
        </p>
      </div>
      <div class='product-card-div3'>
        <p>
          <b>Description</b>
        </p>
        <p className='product-card-desc'>{filterItems.description}</p>

        <p>
          <b>Ingredients</b>
        </p>
        <div className='product-card-ing'>
          {filterItems.ingredients.map((item) => `${item}, `)}
        </div>
      </div>
      <div class='product-card-div4'>
        {!token && (
          <button
            className='btn menu-item-btn'
            onClick={() => {
              navigate('/signin')
            }}
          >
            LOGIN TO ADD
          </button>
        )}
        {token && qty === 0 ? (
          <button className='btn menu-item-btn' onClick={addToCartHandler}>
            ADD TO CART
          </button>
        ) : (
          token && (
            <div className='menu-item-btn flex-sa'>
              <button
                className='btn item-counter-btn'
                onClick={addToCartHandler}
              >
                <p>+</p>
              </button>
              <p>{qty}</p>
              <button
                className='btn item-counter-btn'
                onClick={removeFromCartHandler}
              >
                <p>-</p>
              </button>
            </div>
          )
        )}
      </div>
    </div>
  )

  return (
    <>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false)
          }}
        >
          {modalContent}
        </Modal>
      )}
      <Toaster position='bottom-right' reverseOrder={false} />
      <div key={itemKey} className='card flex'>
        <div
          className='card-img-container'
          onClick={() => {
            setShowModal(true)
          }}
        >
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
    </>
  )
}

export default Card
