import * as actionTypes from '../constants/productConstants'
import env from 'react-dotenv'

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_REQUEST })

    const response = await fetch(`${env.BASE_URL}/api/dishes`)

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`)
    }
    const data = await response.json()

    dispatch({
      type: actionTypes.GET_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
