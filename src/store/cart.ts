import {createSlice} from "@reduxjs/toolkit"

interface CartItem {
        product_id: string;
        quantity: number;
}

interface CartState {
        items: CartItem[];
}

const initialState: CartState = {
        items: []
}

const CartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
                addToCart(state, action){
                        const{product_id, quantity} =action.payload;
                        const indexproduct_id = state.items.find(item => item.product_id ===product_id);
                        if(indexproduct_id){
                                indexproduct_id.quantity += quantity;
                        }else{
                                state.items.push({product_id, quantity});
                        }
                },
                ReduceCart(state, action){
                        const{product_id, quantity} =action.payload;
                        const indexproduct_id = state.items.find(item => item.product_id ===product_id);
                        if(indexproduct_id){
                                indexproduct_id.quantity -= quantity;
                                if(indexproduct_id.quantity < 1){
                                        const index = state.items.findIndex(item => item.product_id === product_id);
                                        if (index !== -1) {
                                        state.items.splice(index, 1);
                                }
                                }
                        }
                        else{
                                state.items.push({product_id, quantity});
                        }
                },
                IncreaseCart(state, action){
                        const{product_id, quantity} =action.payload;
                        const indexproduct_id = state.items.find(item => item.product_id ===product_id);
                        if(indexproduct_id){
                                indexproduct_id.quantity += quantity;
                        }else{
                                state.items.push({product_id, quantity});
                        }
                },
                DeleteCart(state, action){
                        const { product_id } = action.payload;
                        const index = state.items.findIndex(item => item.product_id === product_id);
                        if (index !== -1) {
                        state.items.splice(index, 1);
                        // console.log("Current State",state.items)
    }
                }
        }
})
export const {addToCart,ReduceCart,IncreaseCart,DeleteCart } = CartSlice.actions
export default CartSlice.reducer;