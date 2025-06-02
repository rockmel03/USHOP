import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
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
          productId: product._id,
          product,
          quantity,
          addedAt: new Date().toISOString(),
        });
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },

    setQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const index = state.items.findIndex(
        (item) => item.productId === productId
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
        (item) => item.productId === productId
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
        (item) => item.productId === productId
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
  state.cart.items.map(({ productId, quantity, addedAt }) => ({
    productId,
    quantity,
    addedAt,
  }));
