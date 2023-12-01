
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const updatedAmount = state.totalAmount + action.payload.price * action.payload.quantity
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      )
      const existingCartItem = state.items[existingCartItemIndex]

      let updatedItems
      
      if (existingCartItem) {
        const updateItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + action.payload.quantity,
        }
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updateItem
      } else {
        updatedItems = state.items.concat(action.payload)
      }
      console.log(
        `Items in Cart : ${JSON.stringify(
          updatedItems
        )} : total amount : ${updatedAmount}`
      )
      return {
        items: updatedItems,
        totalAmount: updatedAmount,
      }
    }

    case 'REMOVE_ITEM': {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.productId === action.payload
      )
      const existingCartItem = state.items[existingCartItemIndex]
      const updatedAmount = state.totalAmount - existingCartItem.price

      let updatedItems
      if (existingCartItem.quantity === 1) {
        updatedItems = state.items.filter(
          (item) => item.productId !== action.payload
        )
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        }
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
      }

      return {
        items: updatedItems,
        totalAmount: updatedAmount,
      }
    }

    case 'REMOVE_FULL_ITEM': {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.productId === action.payload
      )
      const existingCartItem = state.items[existingCartItemIndex]
      const updatedAmount =
        state.totalAmount - existingCartItem.price * existingCartItem.quantity

      let updatedItems
      updatedItems = state.items.filter(
        (item) => item.productId !== action.payload
      )

      return {
        items: updatedItems,
        totalAmount: updatedAmount,
      }
    }

    case 'CLEAR_CART':
      return {
        items: [],
        totalAmount: 0,
      }

    default:
      return {
        ...state,
      }
  }
}

export default cartReducer
