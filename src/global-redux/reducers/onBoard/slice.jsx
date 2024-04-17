import { toast } from "react-toastify";
import { onBoarding } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  response: {},
  onBoardingAddSuccess: false,
};

export const setupOnBoarding = createAsyncThunk(
  "onBoard/onBoarding",
  async (data, thunkAPI) => {
    return onBoarding(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "onBoard",
  initialState,
  reducers: {
    resetOnBoardingAddSuccess: (state) => {
      state.onBoardingAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // All Options
    builder
      .addCase(setupOnBoarding.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupOnBoarding.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.onBoardingAddSuccess = true;
        toast.success("On-Boarding Response Fetched Successfully");
        state.response = payload || [{ error: "Not Found" }];
      })
      .addCase(setupOnBoarding.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetOnBoardingAddSuccess } = slice.actions;

export default slice.reducer;
