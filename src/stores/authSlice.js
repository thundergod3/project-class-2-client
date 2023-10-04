import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: undefined,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUserData } = authSlice.actions;
