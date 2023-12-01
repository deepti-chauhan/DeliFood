import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  addItem,
  removeItem,
  removeFullitem,
} from '../../cartStore/cartActions/cartSlice'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const CartItem = (props) => {
  const removeItemHandler = async () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#557c55',
      cancelButtonColor: '#D74234',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFullitem(props.productId))
        Swal.fire({
          title: 'Deleted!',
          text: 'Item has been deleted from the cart.',
          icon: 'success',
        })
      }
    })
  }

  const increaseItemQty = async () => {
    const apidata = {
      productId: props.productId,
      quantity: 1,
    }

    dispatch(addItem(apidata))
    toast.success('Item added to cart');
  }

  const decreaseItemQty = async () => {
    dispatch(removeItem(props.productId))
    toast.success('Item removed from cart');
  }

  const dispatch = useDispatch()

  return (
    <>
      <Toaster position='bottom-right' reverseOrder={true} />
      <div key={props.productId} className='flex-center'>
        <div className='cart-item-container flex-sb '>
          <div className='cart-item-image flex-center'>
            <img src={props.img} />
          </div>
          <div className='cart-item-details'>
            <div>{props.name}</div>
            <div> ${props.price}</div>
          </div>
          <div className='cart-item-counter flex'>
            <button onClick={increaseItemQty}> + </button>
            {props.quantity}
            <button onClick={decreaseItemQty}> - </button>
          </div>
          <div className='cart-item-close-btn'>
            <button type='close' onClick={removeItemHandler}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItem
