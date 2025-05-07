import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems"))  :  [],
  
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, actions) {
          toast.success("Item added to cart");
          
      state.totalItems.push(actions.payload);
      localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
      console.log('state.totalitems',state.totalItems)
    },

    removeFromCart(state, actions) {
      
      state.totalItems = state.totalItems.filter((item)=> item._id !== actions.payload)
      // const index = state.totalItems.indexOf(actions.payload)
      // console.log('index',index)
      // state.totalItems.splice(index, 1);
      localStorage.setItem('totalItems', JSON.stringify(state.totalItems))
      // console.log('state.totalitems',state.totalItems)
      toast.error("Item removed from cart");
      
      
    },

    resetCart(state, value) {
      state.totalItems = [];
      localStorage.setItem('totalItems',JSON.stringify(state.totalItems))
        
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
