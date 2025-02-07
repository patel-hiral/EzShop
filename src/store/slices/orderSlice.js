import { createSlice } from "@reduxjs/toolkit";

function loadOrdersFromStorage() {
  const orders = localStorage.getItem("orders");
  return orders ? JSON.parse(orders) : [];
}

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: loadOrdersFromStorage(),
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;
