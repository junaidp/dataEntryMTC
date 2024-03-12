import { toast } from "react-toastify";
import { getAllExperience, addExperience } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allExperience: [],
  experienceAddSuccess: false,
};

export const setupGetAllExperience = createAsyncThunk(
  "experience/getAllExperience",
  async (data, thunkAPI) => {
    return getAllExperience(data, thunkAPI);
  }
);
export const setupAddExperience = createAsyncThunk(
  "experience/addExperience",
  async (data, thunkAPI) => {
    return addExperience(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    resetExperienceAddSuccess: (state) => {
      state.experienceAddSuccess = false;
    },
  },
  // All Experience
  extraReducers: (builder) => {
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
  },
});

export const { resetExperienceAddSuccess } = slice.actions;

export default slice.reducer;
