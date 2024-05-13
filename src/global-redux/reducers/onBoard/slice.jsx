import { toast } from "react-toastify";
import { onBoarding, chat, signIn } from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  response: {},
  onBoardingAddSuccess: false,
  chatResponse: "",
  customerId: "66332bb85725cd245aab4459",
  experiences: [],
  signUpAddSuccess: false,
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
export const setupSignIn = createAsyncThunk(
  "onBoard/signIn",
  async (data, thunkAPI) => {
    return signIn(data, thunkAPI);
  }
);

export const slice = createSlice({
  name: "onBoard",
  initialState,
  reducers: {
    resetOnBoardingAddSuccess: (state) => {
      state.onBoardingAddSuccess = false;
      state.signUpAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // All Options
    builder
      .addCase(setupOnBoarding.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupOnBoarding.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.response = payload || [{ error: "Not Found" }];
        state.customerId = payload.customerId || "66332bb85725cd245aab4459";
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
        if (payload?.experiences?.length === 0) {
          state.chatResponse = payload?.chatResponse || "";
        }
        state.experiences = payload?.experiences || [];
      })
      .addCase(setupChat.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.response?.data?.message) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error("An Error has occurred");
        }
      });
    // Sign In
    builder
      .addCase(setupSignIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupSignIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("User Sign In Successfully");
        state.signUpAddSuccess = true;
      })
      .addCase(setupSignIn.rejected, (state, action) => {
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
