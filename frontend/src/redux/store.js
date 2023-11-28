import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slice/cartSlice'

// create store
export const store = configureStore({
  reducer: {
    allCart: cartSlice,
  },
})
