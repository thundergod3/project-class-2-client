import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { authReducer } from "./authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_ENV !== "prod",
});

export default store;
