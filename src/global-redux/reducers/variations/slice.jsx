import { toast } from "react-toastify";
import { addVariation, getAllVariations, deleteVaration } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allVariations: [],
  variationAddSuccess: false,
};

export const setupAddVariation = createAsyncThunk(
  "variation/addVariation",
  async (data, thunkAPI) => {
    return addVariation(data, thunkAPI);
  }
);
export const setupGetAllVariations = createAsyncThunk(
  "variation/getAllVariations",
  async (data, thunkAPI) => {
    return getAllVariations(data, thunkAPI);
  }
);
export const setupDeleteVaration = createAsyncThunk(
  "variation/deleteVaration",
  async (data, thunkAPI) => {
    return deleteVaration(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "variation",
  initialState,
  reducers: {
    resetVariationAddSuccess: (state) => {
      state.variationAddSuccess = false;
    },
    resetVariations: (state) => {
      state.allVariations = [];
    },
  },
  // All Options
  extraReducers: (builder) => {
    builder
      .addCase(setupGetAllVariations.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllVariations.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allVariations = payload || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllVariations.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    builder
      .addCase(setupAddVariation.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddVariation.fulfilled, (state) => {
        state.loading = false;
        state.variationAddSuccess = true;
      })
      .addCase(setupAddVariation.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    builder
      .addCase(setupDeleteVaration.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteVaration.fulfilled, (state) => {
        state.loading = false;
        state.variationAddSuccess = true;
        toast.success("Variation Deleted Successfully");
      })
      .addCase(setupDeleteVaration.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetVariationAddSuccess, resetVariations } = slice.actions;

export default slice.reducer;
