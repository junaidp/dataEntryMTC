import { toast } from "react-toastify";
import { getAllService, addService } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allService: [],
  serviceAddSuccess: false,
};

export const setupGetAllService = createAsyncThunk(
  "service/getAllService",
  async (data, thunkAPI) => {
    return getAllService(data, thunkAPI);
  }
);
export const setupAddService = createAsyncThunk(
  "service/addService",
  async (data, thunkAPI) => {
    return addService(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "service",
  initialState,
  reducers: {
    resetServiceAddSuccess: (state) => {
      state.serviceAddSuccess = false;
    },
  },
  // All service
  extraReducers: (builder) => {
    builder
      .addCase(setupGetAllService.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllService.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allService = payload || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllService.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    builder
      .addCase(setupAddService.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddService.fulfilled, (state) => {
        state.loading = false;
        state.serviceAddSuccess = true;
      })
      .addCase(setupAddService.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetServiceAddSuccess } = slice.actions;

export default slice.reducer;
