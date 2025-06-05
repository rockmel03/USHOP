import { createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  clearCartItems,
  getCart,
  removeCartItem,
  updateCartItem,
} from "./cartThunk";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload;
      if (quantity < 1) return;

      const index = state.items.findIndex(
        (item) => item.product._id === product._id
      );

      if (index !== -1) {
        const stock = state.items[index].product.stock;
        const prevQuantity = state.items[index].quantity;

        if (stock && prevQuantity + quantity > stock) {
          state.items[index].quantity = stock;
        } else state.items[index].quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          addedAt: new Date().toISOString(),
        });
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );
    },

    setQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const index = state.items.findIndex(
        (item) => item.product._id === productId
      );

      if (index !== -1) {
        const stock = state.items[index].product.stock;

        if (quantity === 0) {
          state.items.splice(index, 1);
        } else if (stock && quantity > stock) {
          state.items[index].quantity = stock;
        } else {
          state.items[index].quantity = quantity;
        }
      }
    },

    increaseQuantity(state, action) {
      const productId = action.payload;

      const index = state.items.findIndex(
        (item) => item.product._id === productId
      );
      if (index !== -1) {
        const stock = state.items[index].product.stock;
        const prevQuantity = state.items[index].quantity;

        if (stock && prevQuantity + 1 > stock) {
          state.items[index].quantity = stock;
        } else state.items[index].quantity += 1;
      }
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;

      const index = state.items.findIndex(
        (item) => item.product._id === productId
      );
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else state.items.splice(index, 1);
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status) {
          state.items = action.payload.data.items;
        }
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status) {
          state.items = action.payload.data.items;
        }
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status) {
          state.items = action.payload.data.items;
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status) {
          state.items = action.payload.data.items;
        }
      })
      .addCase(clearCartItems.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status) {
          state.items = [];
        }
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  setQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

//selectors
export const selectCartTotalQuantity = (state) =>
  state.cart.items.reduce((acc, curr) => acc + curr.quantity, 0);

export const selectCartTotalAmount = (state) =>
  state.cart.items.reduce(
    (acc, curr) => acc + curr.quantity * curr.product.price,
    0
  );

export const selectCartDataForServer = (state) =>
  state.cart.items.map(({ product, quantity, addedAt }) => ({
    productId: product._id,
    quantity,
    addedAt,
  }));
