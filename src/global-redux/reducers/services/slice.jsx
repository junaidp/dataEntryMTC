import { toast } from "react-toastify";
import {
  getAllService,
  addService,
  getAllServiceWithOutParama,
  deleteService,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allService: [],
  serviceAddSuccess: false,
  selectedService: {},
};

export const setupGetAllService = createAsyncThunk(
  "service/getAllService",
  async (data, thunkAPI) => {
    return getAllService(data, thunkAPI);
  }
);
export const setupGetAllServiceWithOutParama = createAsyncThunk(
  "service/getAllServiceWithOutParama",
  async (data, thunkAPI) => {
    return getAllServiceWithOutParama(data, thunkAPI);
  }
);
export const setupAddService = createAsyncThunk(
  "service/addService",
  async (data, thunkAPI) => {
    return addService(data, thunkAPI);
  }
);
export const setupDeleteService = createAsyncThunk(
  "service/deleteService",
  async (data, thunkAPI) => {
    return deleteService(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "service",
  initialState,
  reducers: {
    resetServiceAddSuccess: (state) => {
      state.serviceAddSuccess = false;
    },
    changeSelectedService: (state, action) => {
      state.selectedService = action?.payload;
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
    // Get All Services WithOut Params
    builder
      .addCase(setupGetAllServiceWithOutParama.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetAllServiceWithOutParama.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.allService = payload || [{ error: "Not Found" }];
        }
      )
      .addCase(setupGetAllServiceWithOutParama.rejected, (state, action) => {
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
    builder
      .addCase(setupDeleteService.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteService.fulfilled, (state) => {
        state.loading = false;
        state.serviceAddSuccess = true;
        toast.success("Service Deleted Successfully");
      })
      .addCase(setupDeleteService.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetServiceAddSuccess, changeSelectedService } = slice.actions;

export default slice.reducer;
