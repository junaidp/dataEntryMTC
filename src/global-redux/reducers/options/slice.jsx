import { toast } from "react-toastify";
import { addOption, getAllOptions, deleteOption } from "./thunk";
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
  // All Options
  extraReducers: (builder) => {
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

export const { resetOptionAddSuccess,resetOptions } = slice.actions;

export default slice.reducer;
