import { useContext, useReducer } from 'react'
import cartReducer from './cartReducer'
import CartContext from './CartContext'

const intialCartState = {
  items: [],
  totalAmount: 0,
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, intialCartState)

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
    // console.log(item)
  }

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const removeFullItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_FULL_ITEM', payload: id })
  }


  const clearAllItemFromCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  // console.log(state)
  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    removeFullItem : removeFullItemFromCart,
    clearCart: clearAllItemFromCart,
  }

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  )
}

const useGlobalCartContext = () => {
  return useContext(CartContext)
}

export { CartContext, CartProvider, useGlobalCartContext }
