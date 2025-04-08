import {createSlice} from "@reduxjs/toolkit"

const initialState = {
        items:[]
}

const CartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {

        }
})
export default CartSlice.reducer;