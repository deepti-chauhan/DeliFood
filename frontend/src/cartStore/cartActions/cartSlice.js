import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import env from 'react-dotenv'

const token = localStorage.getItem('token')

export const fetchCart = createAsyncThunk('fetchCart', async () => {
    console.log("cart api....")
  const response = await fetch(`${env.BASE_URL}/api/cart/items`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`,
    },
  })

  const data = response.json()
  console.log("cart items from api : ", data)
  return data
})

export const addItem = createAsyncThunk(
  'addItem',
  async (apidata) => {
      

    const { productId, quantity } = apidata
    
    console.log(productId)
    console.log("qty : " + quantity)

    const response = await fetch(`${env.BASE_URL}/api/cart/addItem`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    })

    const data = response.json()
    console.log('cart after add item : ', data)
    return data
  }
)

export const removeItem = createAsyncThunk('removeItem', async (productId) => {
    console.log("product id : " , productId)
  const response = await fetch(
    `${env.BASE_URL}/api/cart/removeItemByOne?productId=${productId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `${token}`,
      },
    }
  )

  const data = response.json()
  return data
})

export const removeFullitem = createAsyncThunk(
  'removeFullitem',
  async (productId) => {
    const response = await fetch(
      `${env.BASE_URL}/api/cart/removeFullItem/${productId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${token}`,
        },
      }
    )

    const data = response.json()
    return data
  }
)

export const clearCart = createAsyncThunk('clearCart', async () => {
  const response = await fetch(`${env.BASE_URL}/api/cart/clear`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`,
    },
  })

  const data = response.json()
  return data
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload
        state.totalAmount = action.payload.totalAmount
        state.loading = false
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items = action.payload
        state.totalAmount = action.payload.totalAmount
        state.loading = false
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = action.payload
        state.totalAmount = action.payload.totalAmount
        state.loading = false
      })
      .addCase(removeFullitem.fulfilled, (state, action) => {
        state.items = action.payload
        state.totalAmount = action.payload.totalAmount
        state.loading = false
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = action.payload
        state.totalAmount = action.payload.totalAmount
        state.loading = false
      })
  },
})

export default cartSlice.reducer
