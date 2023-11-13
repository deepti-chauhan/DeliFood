import { useGlobalCartContext } from '../../store/CartProvider'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const CartButton = () => {
  const cartContext = useGlobalCartContext()
  const { items } = cartContext
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0)
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
