import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/CartContext'
import Modal from '../shared/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {addItem, removeItem } from '../../cartStore/cartActions/cartSlice'
// import {
//   getCartTotal,
//   removeItem,
//   decreaseItemQuantity,
//   increaseItemQuantity,
// } from '../../cartStore/cartActions/cartSlice'
// import { useDispatch, useSelector } from 'react-redux'

const CartItem = (props) => {
  const cartContext = useContext(CartContext)
  const [showModal, setShowModal] = useState(false)

  // const { cart, totalQuantity, totalPrice } = useSelector(
  //   (state) => state.allCart
  // )

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getCartTotal())
  // }, [cart])

  // const increaseItemQuantity = () => {
  //   cartContext.addItem({
  //     productId: props.productId,
  //     quantity: 1,
  //   })
  // }

  // const decreaseItemQuantity = () => {
  //   cartContext.removeItem(props.productId)
  // }

  // const removeItem = () => {
  //   cartContext.removeFullItem(props.productId)
  //   setShowModal(false)
  // }

  const dispatch = useDispatch()

  const incrementHandler = () => {
    try {
      const data = {
        productId: props.productId,
        quantity: 1,
      }

      dispatch(addItem(data))
    } catch (error) {
      console.error('error : ', error)
    }
  }

  const decrementHandler = () => {
    try {
      dispatch(removeItem(props.productId))
    } catch (error) {
      console.error('Error : ', error)
    }
  }

  const onClose = () => {
    setShowModal(false)
  }

  const modalContent = (
    <div className=''>
      <p>Are your sure ??</p>
      <div>
        <img src='./assets/package.gif' width='100' />
      </div>
      <button onClick={removeItem} className='btn main-btn'>
        Remove Item
      </button>
    </div>
  )

  const qty = useSelector(state => state.items)

  return (
    <div key={props.productId} className='cart-item-wrapper flex-center'>
      <div className='cart-item-container flex-sb '>
        <div className='cart-item-counter flex'>
          <button onClick={incrementHandler}> + </button>
          {/* {props.quantity} */}
          {qty}
          <button onClick={decrementHandler}> - </button>
        </div>
        <div className='cart-item-image flex-center'>
          <img src={props.image} />
        </div>
        <div className='cart-item-details'>
          <div>{props.name}</div>
          <div> ${props.price}</div>
        </div>
        <div className='cart-item-close-btn'>
          <button type='close' onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
      {showModal && <Modal onClose={onClose}>{modalContent}</Modal>}
    </div>
  )
}

export default CartItem
