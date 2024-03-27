import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalPrice: [], // Initialize totalPrice as an empty object
    totalAmount: 0,
    qty:0 // Initialize totalAmount to 0
  },
  reducers: {
    setPriceTotal: (state, action) => {
      // Update the totalPrice object with the new price and quantity
      state.totalPrice[action.payload.id] = {
        id: action.payload.id,
        qty: action.payload.qty,
        price: action.payload.price
      };
    },
    calculateTotal: (state) => {
      let total = 0;
      // Loop through each item in the totalPrice object and calculate the total amount
      Object.values(state.totalPrice).forEach(item => {
        total += item.qty * item.price;
      });
      // Update the totalAmount state with the calculated total
      state.totalAmount = total;
    },
    cartQty: (state, action) =>{
      state.qty = action.payload
    }
  },
});

export const { setPriceTotal, calculateTotal,cartQty } = cartSlice.actions;

export default cartSlice.reducer;
