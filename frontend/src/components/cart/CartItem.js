import React, { useContext } from 'react'
import CartContext from '../../store/CartContext'

const CartItem = (props) => {
  const cartContext = useContext(CartContext)

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
  }
  return (
    <div className='cart-item-wrapper flex-center'>
      {/* add image  */}
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
          <button type='close' onClick={removeItem}>X</button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
