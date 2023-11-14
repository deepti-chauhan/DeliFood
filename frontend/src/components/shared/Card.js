import React, { useState } from 'react'
import '../styles/Card.css'
import { useGlobalCartContext } from '../../store/CartProvider'

export const Card = (props) => {
  const cartContext = useGlobalCartContext()
  const price = `${props.price.toFixed(2)}`
  const [qty, setQty] = useState(0)

  const addItemtoCart = () => {
    setQty(qty + 1)
    cartContext.addItem({
      id: props.id,
      name: props.name,
      quantity: 1,
      price: props.price,
      image: props.img,
    })
  }

  const removeItemfromCart = () => {
    setQty(qty - 1)
    cartContext.removeItem(props.id)
  }
  return (
    <>
      <div className='card flex'>
        <div key={props.id} className='card-img-container flex'>
          <img className='card-img' src={props.img} />
        </div>
        <div className='card-title'>{props.name}</div>
        <div className='card-title'>${price}</div>
        <div  className='flex-center cart-add-item'>
          {qty === 0 ? (
            <button className='btn main-btn' onClick={addItemtoCart}>
              ADD ITEM
            </button>
          ) : (
            <div  className='flex-sa add-item-counter'>
              <button className='add-item-btn' onClick={addItemtoCart}>
                +
              </button>
              {qty}
              <button className='add-item-btn' onClick={removeItemfromCart}>
                -
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Card
