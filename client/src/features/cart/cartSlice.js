import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("STitems")) || [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addToCarRequest: (state) => {
      state.loading = true;
    },
    addToCarSuccess: (state, action) => {
      const item = action.payload;
      const index = state.cartItems.findIndex((el) => el._id === item._id);
      console.log(index);
      if (index !== -1) {
        state.cartItems[index].quantity += item.quantity;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
    addToCarFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addToCarRequest, addToCarSuccess, addToCarFailure } =
  cartSlice.actions;

export default cartSlice.reducer;
