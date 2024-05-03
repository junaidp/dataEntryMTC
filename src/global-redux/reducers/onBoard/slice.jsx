import { toast } from "react-toastify";
import { onBoarding, chat } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  response: {},
  onBoardingAddSuccess: false,
  chatResponse: "",
  customerId: "",
  experiences: JSON.parse(sessionStorage.getItem("experiences")) || [],
};

export const setupOnBoarding = createAsyncThunk(
  "onBoard/onBoarding",
  async (data, thunkAPI) => {
    return onBoarding(data, thunkAPI);
  }
);
export const setupChat = createAsyncThunk(
  "onBoard/chat",
  async (data, thunkAPI) => {
    return chat(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "onBoard",
  initialState,
  reducers: {
    resetOnBoardingAddSuccess: (state) => {
      state.onBoardingAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // All Options
    builder
      .addCase(setupOnBoarding.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupOnBoarding.fulfilled, (state, { payload }) => {
        state.response = payload || [{ error: "Not Found" }];
        sessionStorage.setItem("customerId", payload?.customerId);
        state.customerId = payload.customerId || "";
        state.loading = false;
        state.onBoardingAddSuccess = true;
        toast.success("On-Boarding Response Fetched Successfully");
      })
      .addCase(setupOnBoarding.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Chat
    builder
      .addCase(setupChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupChat.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (
          JSON.parse(payload?.chatResponse)?.model === "claude-3-haiku-20240307"
        ) {
          state.chatResponse = JSON.parse(
            payload?.chatResponse
          )?.content[0]?.text;
        }
        if (payload?.experiences && payload?.experiences?.length !== 0) {
          state.experiences = payload?.experiences;
          sessionStorage.setItem(
            "experiences",
            JSON.stringify(payload?.experiences)
          );
        }
      })
      .addCase(setupChat.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
  },
});

export const { resetOnBoardingAddSuccess } = slice.actions;

export default slice.reducer;
