import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartActions/cartSlice'

const store = configureStore({
  reducer: {
    cart : cartReducer
  },
})

export default store
