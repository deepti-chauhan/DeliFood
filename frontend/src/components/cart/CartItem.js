import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/CartContext'
import Modal from '../shared/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  addItem,
  removeItem,
  removeFullitem,
} from '../../cartStore/cartActions/cartSlice'
import env from 'react-dotenv'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const CartItem = (props) => {
  const cartContext = useContext(CartContext)
  const [showModal, setShowModal] = useState(false)
  const token = localStorage.getItem('token')

  // const addItemtoCartApi = async () => {
  //   try {
  //     await fetch(`${env.BASE_URL}/api/cart/addItem`, {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         productId: props.productId,
  //         quantity: 1,
  //       }),
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `${token}`,
  //       },
  //     })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  // const removeItemFromCartApi = async () => {
  //   try {
  //     await fetch(
  //       `${env.BASE_URL}/api/cart/removeItem?productId=${props.productId}`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-type': 'application/json',
  //           Authorization: `${token}`,
  //         },
  //       }
  //     )
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  // const removeItemByOneFromCartApi = async () => {
  //   try {
  //     await fetch(
  //       `${env.BASE_URL}/api/cart/removeItemByOne?productId=${props.productId}`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-type': 'application/json',
  //           Authorization: `${token}`,
  //         },
  //       }
  //     )
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  // const increaseItemQuantity = () => {
  //   cartContext.addItem({
  //     productId: props.productId,
  //     name: props.name,
  //     quantity: 1,
  //     price: props.price,
  //     image: props.img,
  //   })

  //   addItemtoCartApi()
  // }
  // const decreaseItemQuantity = () => {
  //   cartContext.removeItem(props.productId)
  //   removeItemByOneFromCartApi()
  // }
  // const removeItem = () => {
  //   cartContext.removeFullItem(props.productId)
  //   removeItemFromCartApi()
  //   setShowModal(false)
  // }
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

  // const qty = useSelector(state => state.items)

  const increaseItemQty = async () => {
    const apidata = {
      productId: props.productId,
      quantity: 1,
    }

    dispatch(addItem(apidata))
  }

  const decreaseItemQty = async () => {
    dispatch(removeItem(props.productId))
  }

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.items)

  return (
    <div key={props.productId} className='cart-item-wrapper flex-center'>
      <div className='cart-item-container flex-sb '>
        <div className='cart-item-counter flex'>
          <button onClick={increaseItemQty}> + </button>
          {props.quantity}
          <button onClick={decreaseItemQty}> - </button>
        </div>
        <div className='cart-item-image flex-center'>
          <img src={props.image} />
        </div>
        <div className='cart-item-details'>
          <div>{props.name}</div>
          <div> ${props.price}</div>
        </div>
        <div className='cart-item-close-btn'>
          <button type='close' onClick={removeItemHandler}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
