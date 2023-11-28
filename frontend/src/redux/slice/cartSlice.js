import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    carts: []
}

// card slice
const cartSlice = createSlice({
    name: "cartslice",
    initialState,
    reducers: {

        // add to cart
        addToCart: (state, action) => {

            const itemIndex = state.carts.findIndex((item) => item.productId === action.payload.productId);

            if (itemIndex >= 0) {
                state.carts[itemIndex].quantity += 1
            } else {
                const temp = { ...action.payload, quantity: 1 }
                state.carts = [...state.carts, temp]

            }
        },

        // remove particular items
        removeToCart:(state,action)=>{
            const data = state.carts.filter((ele)=>ele.productId !== action.payload);
            state.carts = data
        },

        // remove single items
        removeSingleitems:(state,action)=>{
            const itemIndex_dec = state.carts.findIndex((item) => item.productId === action.payload.productId);

            if(state.carts[itemIndex_dec].quantity >=1){
                state.carts[itemIndex_dec].quantity -= 1
            }

        },

        // clear cart
        emptycartitem:(state,action)=>{
            state.carts = []
        }
    }
});

export const { addToCart,removeToCart,removeSingleitems ,emptycartitem} = cartSlice.actions;

export default cartSlice.reducer;