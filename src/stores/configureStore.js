import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const reducer = combineReducers({});

const store = configureStore({
  reducer,
  devTools: process.env.REACT_APP_ENV !== "prod",
});

export default store;
