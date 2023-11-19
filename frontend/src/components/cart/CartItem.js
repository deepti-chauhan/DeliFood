import React, { useContext, useState } from 'react'
import CartContext from '../../store/CartContext'
import Modal from '../shared/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


const CartItem = (props) => {
  const cartContext = useContext(CartContext)
  const [showModal, setShowModal] = useState(false)

  const increaseItemQuantity = () => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      quantity: 1,
      price: props.price,
      image: props.img,
    })
  }

  const decreaseItemQuantity = () => {
    cartContext.removeItem(props.id)
  }

  const removeItem = () => {
    cartContext.removeFullItem(props.id)
    setShowModal(false)
  }

  const onClose = () => {
    setShowModal(false)
  }

  const modalContent = <div className=''>
    <p>Are your sure ??</p>
    <div>
      <img src='./assets/package.gif' width='100'/>
    </div>
    <button onClick={removeItem} className='btn main-btn'>Remove Item</button>
  </div>

  
  return (
    <div key={props.id} className='cart-item-wrapper flex-center'>
      <div className='cart-item-container flex-sb '>
        <div className='cart-item-counter flex'>
          <button onClick={increaseItemQuantity}> + </button>
          {props.quantity}
          <button onClick={decreaseItemQuantity}> - </button>
        </div>
        <div className='cart-item-image flex-center'>
          <img src={props.image} />
        </div>
        <div className='cart-item-details'>
          <div>{props.name}</div>
          <div> ${props.price}</div>
        </div>
        <div className='cart-item-close-btn'>
          <button type='close' onClick={()=>setShowModal(true)}>
            <FontAwesomeIcon icon={faTrashCan}/>
          </button>
        </div>
      </div>
      {showModal && <Modal onClose={onClose}>{modalContent}</Modal>}
    </div>
  )
}

export default CartItem
