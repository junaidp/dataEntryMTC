import { toast } from "react-toastify";
import {
  getAllVendors,
  addVendor,
  searchVendorByQuery,
  deleteVendor,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allVendors: [],
  vendorAddSuccess: false,
};

export const setupGetAllVendors = createAsyncThunk(
  "vendor/getAllVendors",
  async (data, thunkAPI) => {
    return getAllVendors(data, thunkAPI);
  }
);
export const setupSearchVendorByQuery = createAsyncThunk(
  "vendor/searchVendorByQuery",
  async (data, thunkAPI) => {
    return searchVendorByQuery(data, thunkAPI);
  }
);
export const setupAddVendor = createAsyncThunk(
  "vendor/addVendor",
  async (data, thunkAPI) => {
    return addVendor(data, thunkAPI);
  }
);
export const setupDeleteVendor = createAsyncThunk(
  "vendor/deleteVendor",
  async (data, thunkAPI) => {
    return deleteVendor(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    resetVendorAddSuccess: (state) => {
      state.vendorAddSuccess = false;
    },
  },
  // All Vendors
  extraReducers: (builder) => {
    builder
      .addCase(setupGetAllVendors.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllVendors.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allVendors = payload || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllVendors.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // By Query
    builder
      .addCase(setupSearchVendorByQuery.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSearchVendorByQuery.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allVendors = payload || [{ error: "Not Found" }];
      })
      .addCase(setupSearchVendorByQuery.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Add Vendor
    builder
      .addCase(setupAddVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddVendor.fulfilled, (state) => {
        state.loading = false;
        state.vendorAddSuccess = true;
      })
      .addCase(setupAddVendor.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Delete Vendor
    builder
      .addCase(setupDeleteVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteVendor.fulfilled, (state) => {
        state.loading = false;
        state.vendorAddSuccess = true;
        toast.success("Vendor Deleted Successfully");
      })
      .addCase(setupDeleteVendor.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetVendorAddSuccess } = slice.actions;

export default slice.reducer;
