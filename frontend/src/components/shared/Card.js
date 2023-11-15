import React, { useState } from 'react'
import '../styles/Card.css'
import { useGlobalCartContext } from '../../store/CartProvider'

export const Card = ({key , filterItems}) => {
  const cartContext = useGlobalCartContext()
  const price = `${filterItems.price.toFixed(2)}`
  const [qty, setQty] = useState(0)

  const addItemtoCart = () => {
    setQty(qty + 1)
    cartContext.addItem({
      id: filterItems.id,
      name: filterItems.name,
      quantity: 1,
      price: filterItems.price,
      image: filterItems.img,
    })
  }

  const removeItemfromCart = () => {
    setQty(qty - 1)
    cartContext.removeItem(filterItems.id)
  }
  return (
    <>
      <div key={key} className='card flex'>
        <div  className='card-img-container flex'>
          <img className='card-img' src={filterItems.img} />
        </div>
        <div className='card-title'>{filterItems.name}</div>
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
