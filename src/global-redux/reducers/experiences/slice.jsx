import { toast } from "react-toastify";
import {
  getAllExperience,
  addExperience,
  getAllExperienceWithOutParams,
  deleteExperience,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allExperience: [],
  experienceAddSuccess: false,
  selectedExperience: {},
};

export const setupGetAllExperience = createAsyncThunk(
  "experience/getAllExperience",
  async (data, thunkAPI) => {
    return getAllExperience(data, thunkAPI);
  }
);
export const setupGetAllExperienceWithOutParams = createAsyncThunk(
  "experience/getAllExperienceWithOutParams",
  async (data, thunkAPI) => {
    return getAllExperienceWithOutParams(data, thunkAPI);
  }
);
export const setupAddExperience = createAsyncThunk(
  "experience/addExperience",
  async (data, thunkAPI) => {
    return addExperience(data, thunkAPI);
  }
);
export const setupDeleteExperience = createAsyncThunk(
  "experience/deleteExperience",
  async (data, thunkAPI) => {
    return deleteExperience(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    resetExperienceAddSuccess: (state) => {
      state.experienceAddSuccess = false;
    },
    changeSelectedExperience: (state, action) => {
      state.selectedExperience = action.payload;
    },
  },
  extraReducers: (builder) => {
    // All Experience
    builder
      .addCase(setupGetAllExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupGetAllExperience.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allExperience = payload || [{ error: "Not Found" }];
      })
      .addCase(setupGetAllExperience.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // All Experience Without Params
    builder
      .addCase(setupGetAllExperienceWithOutParams.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setupGetAllExperienceWithOutParams.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.allExperience = payload || [{ error: "Not Found" }];
        }
      )
      .addCase(setupGetAllExperienceWithOutParams.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });

    builder
      .addCase(setupAddExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupAddExperience.fulfilled, (state) => {
        state.loading = false;
        state.experienceAddSuccess = true;
      })
      .addCase(setupAddExperience.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Delete Experince
    builder
      .addCase(setupDeleteExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupDeleteExperience.fulfilled, (state) => {
        state.loading = false;
        state.experienceAddSuccess = true;
        toast.success("Experience Deleted Successfully");
      })
      .addCase(setupDeleteExperience.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetExperienceAddSuccess, changeSelectedExperience } =
  slice.actions;

export default slice.reducer;
