import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    validateUser: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    
    logout: (state, action) => {
      state.isAuthenticated = null;
      state.user = null;
      state.token = null;
    },
  },
});

export const { validateUser, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
