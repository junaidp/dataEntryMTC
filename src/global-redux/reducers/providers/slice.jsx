import { toast } from "react-toastify";
import {
  getAllProvider,
  addProvider,
  getAllProviderWithOutParams,
  deleteProvider,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allProvider: [],
  providerAddSuccess: false,
  selectedProvider: {},
};

export const setupGetAllProvider = createAsyncThunk(
  "provider/getAllProvider",
  async (data, thunkAPI) => {
    return getAllProvider(data, thunkAPI);
  }
);
export const setupGetAllProviderWithOutParams = createAsyncThunk(
  "provider/getAllProviderWithOutParams",
  async (data, thunkAPI) => {
    return getAllProviderWithOutParams(data, thunkAPI);
  }
);
export const setupAddProvider = createAsyncThunk(
  "provider/addProvider",
  async (data, thunkAPI) => {
    return addProvider(data, thunkAPI);
  }
);
export const setupDeleteProvider = createAsyncThunk(
  "provider/deleteProvider",
  async (data, thunkAPI) => {
    return deleteProvider(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    resetProviderAddSuccess: (state) => {
      state.providerAddSuccess = false;
    },
    changeSelectedProvider: (state, action) => {
      state.selectedProvider = action?.payload;
    },
  },
  // All provider
  extraReducers: (builder) => {
    builder
      .addCase(setupGetAllProvider.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllProvider.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allProvider = payload || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllProvider.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Get all provider without params
    builder
      .addCase(setupGetAllProviderWithOutParams.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetAllProviderWithOutParams.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.allProvider = payload || [{ error: "Not Found" }];
        }
      )
      .addCase(setupGetAllProviderWithOutParams.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    builder
      .addCase(setupAddProvider.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddProvider.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.providerAddSuccess = true;
      })
      .addCase(setupAddProvider.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Delete Provider
    builder
      .addCase(setupDeleteProvider.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteProvider.fulfilled, (state) => {
        state.loading = false;
        state.providerAddSuccess = true;
        toast.success("Provider Deleted Succussfully");
      })
      .addCase(setupDeleteProvider.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetProviderAddSuccess, changeSelectedProvider } =
  slice.actions;

export default slice.reducer;
