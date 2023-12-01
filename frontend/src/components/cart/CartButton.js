import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchCart } from '../../cartStore/cartActions/cartSlice'

const CartButton = () => {
  const token = localStorage.getItem('token')
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  let cartItemCount

  if (!token) {
    cartItemCount = 0
  } else {
    cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0)
  }

  useEffect(() => {
    dispatch(fetchCart())
  }, [])
  return (
    <Link to='/cart'>
      <button className='flex-center cart-item-icon'>
        <FontAwesomeIcon icon={faCartShopping} />
        <span className='cart-icon-counter'>{cartItemCount}</span>
      </button>
    </Link>
  )
}

export default CartButton
