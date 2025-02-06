import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showCheckOut: false,
  },
  reducers: {
    showCheckout: (state) => {
      state.showCheckOut = true;
    },
    hideCheckOut: (state) => {
      state.showCheckOut = false;
    },
  },
});

export const { showCheckout, hideCheckOut } = uiSlice.actions;
export default uiSlice.reducer;
