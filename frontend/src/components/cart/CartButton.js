import React from 'react'

import { useGlobalCartContext } from '../../store/CartProvider'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CartButton = () => {
  const cartContext = useGlobalCartContext()
  const { items } = cartContext
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0)
  return (
    <Link to='/cart'>
      <button className='flex-center cart-item-icon'>
        <FaShoppingCart />
        <span className='cart-icon-counter'>{cartItemCount}</span>
      </button>
    </Link>
  )
}

export default CartButton
