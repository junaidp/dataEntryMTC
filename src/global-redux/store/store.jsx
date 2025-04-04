import { configureStore } from "@reduxjs/toolkit";
import OnBoardingReducer from "../reducers/onBoard/slice";

export const store = configureStore({
  reducer: {
    onBoard: OnBoardingReducer,
  },
});
