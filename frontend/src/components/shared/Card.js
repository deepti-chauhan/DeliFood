import React, { useState } from 'react'
import '../styles/Card.css'
import { useGlobalCartContext } from '../../store/CartProvider'
import toast, { Toaster } from 'react-hot-toast'

export const Card = ({ itemKey, filterItems }) => {
  const cartContext = useGlobalCartContext()
  const price = `${filterItems.price.toFixed(2)}`
  const [qty, setQty] = useState(0)

  const addItemtoCart = () => {
    setQty(qty + 1)
    cartContext.addItem({
      productId: filterItems.productId,
      name: filterItems.name,
      quantity: 1,
      price: filterItems.price,
      image: filterItems.img,
    })

    toast.success('item added successfully')
  }

  // const removeItemfromCart = () => {
  //   setQty(qty - 1)
  //   cartContext.removeItem(filterItems.productId)
  // }


  return (
    <>
      <Toaster position='bottom-left' reverseOrder={true} />
      <div key={itemKey} className='card flex'>
        <div className='card-img-container flex'>
          <img className='card-img' src={filterItems.img} />
        </div>
        <div className='card-title'>{filterItems.name}</div>
        <div className='card-title'>${price}</div>
        <div className='flex-center cart-add-item'>
          {
            <button className='btn menu-item-btn' onClick={addItemtoCart}>
              ADD
            </button>
          }
        </div>
      </div>
    </>
  )
}

export default Card
