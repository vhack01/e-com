import { CreateSliceOptions, createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    itemAdded: (state, action) => {
      const Item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === Item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === existItem._id ? Item : item
        );
      } else {
        state.cartItems = [...state.cartItems, Item];
      }
      return updateCart(state);
    },
    itemRemoved: (state, action) => {
      const Item = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== Item._id);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

const { itemAdded, itemRemoved } = cartSlice.actions;

export default cartSlice.reducer;

// @addItem
export const addItem = (item) => (dispatch, getState) => {
  dispatch(itemAdded(item));
};

// @removeItem
export const removeItem = (item) => (dispatch, getState) => {
  dispatch(itemRemoved(item));
};
