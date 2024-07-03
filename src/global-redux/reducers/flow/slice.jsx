import { toast } from "react-toastify";
import { getFlow } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  flowData: {},
};

export const setupGetFlow = createAsyncThunk(
  "flow/getFlow",
  async (data, thunkAPI) => {
    return getFlow(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "flow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Flow Data
    builder
      .addCase(setupGetFlow.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetFlow.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.flowData = payload?.choices;
      })
      .addCase(setupGetFlow.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const {} = slice.actions;

export default slice.reducer;
