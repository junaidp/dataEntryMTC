import { toast } from "react-toastify";
import {
  addOption,
  getAllOptions,
  getAllOptionsWithOutParams,
  deleteOption,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allOptions: [],
  optionAddSuccess: false,
};

export const setupAddOption = createAsyncThunk(
  "option/addOption",
  async (data, thunkAPI) => {
    return addOption(data, thunkAPI);
  }
);
export const setupGetAllOptions = createAsyncThunk(
  "option/getAllOptions",
  async (data, thunkAPI) => {
    return getAllOptions(data, thunkAPI);
  }
);
export const setupGetAllOptionsWithOutParams = createAsyncThunk(
  "option/getAllOptionsWithOutParams",
  async (data, thunkAPI) => {
    return getAllOptionsWithOutParams(data, thunkAPI);
  }
);
export const setupDeleteOption = createAsyncThunk(
  "option/deleteOption",
  async (data, thunkAPI) => {
    return deleteOption(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "option",
  initialState,
  reducers: {
    resetOptionAddSuccess: (state) => {
      state.optionAddSuccess = false;
    },
    resetOptions: (state) => {
      state.allOptions = [];
    },
  },
  extraReducers: (builder) => {
    // All Options
    builder
      .addCase(setupGetAllOptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllOptions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allOptions = payload || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllOptions.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // All Options WithOut Params
    builder
      .addCase(setupGetAllOptionsWithOutParams.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetAllOptionsWithOutParams.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.allOptions = payload || [{ error: "Not Found" }];
        }
      )
      .addCase(setupGetAllOptionsWithOutParams.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    builder
      .addCase(setupAddOption.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddOption.fulfilled, (state) => {
        state.loading = false;
        state.optionAddSuccess = true;
      })
      .addCase(setupAddOption.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    builder
      .addCase(setupDeleteOption.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteOption.fulfilled, (state) => {
        state.loading = false;
        state.optionAddSuccess = true;
        toast.success("Option Deleted Successfully");
      })
      .addCase(setupDeleteOption.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetOptionAddSuccess, resetOptions } = slice.actions;

export default slice.reducer;
