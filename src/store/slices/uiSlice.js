import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setResolved: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoading, setResolved } = uiSlice.actions;
export default uiSlice.reducer;
