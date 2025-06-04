import { toast } from "react-toastify";
import {
  onBoardingCall,
  chat,
  signIn,
  onBoardingSecondCall,
} from "./thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  response: {},
  onBoardingAddSuccess: false,
  chatResponse: "",
  customerId: "293b846f-9207-4988-b067-0fc21a2bc4b3",
  experiences: [],
  signUpAddSuccess: false,
  signInData: {},
  hypothesis: "",
  firstOnBoardingResult: [],
  secondOnBoardingResult: {},
  onBoardingResult: [],
  subLoading: false,
};

export const setupOnBoardingCall = createAsyncThunk(
  "onBoard/onBoardingCall",
  async (data, thunkAPI) => {
    return onBoardingCall(data, thunkAPI);
  }
);

export const setupOnBoardingSecondCall = createAsyncThunk(
  "onBoard/onBoardingSecondCall",
  async (data, thunkAPI) => {
    return onBoardingSecondCall(data, thunkAPI);
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
      state.signUpAddSuccess = false;
    },
    changeOnBoardingAddSuccess: (state, action) => {
      state.onBoardingAddSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    // On Boarding
    builder
      .addCase(setupOnBoardingCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupOnBoardingCall.fulfilled, (state, action) => {
        state.loading = false;
        state.onBoardingResult = action?.payload || [];
      })
      .addCase(setupOnBoardingCall.rejected, (state, action) => {
        state.loading = false;
      });
    // On Boarding Second Result
    builder
      .addCase(setupOnBoardingSecondCall.pending, (state) => {
        state.loading = true;
        state.onBoardingAddSuccess = true;
      })
      .addCase(setupOnBoardingSecondCall.fulfilled, (state, action) => {
        state.loading = false;
        state.onBoardingAddSuccess = true;
        state.secondOnBoardingResult = action.payload || {};
      })
      .addCase(setupOnBoardingSecondCall.rejected, (state, action) => {
        state.loading = false;
        action.payload.response?.data?.detail?.forEach((errorMsg) => {
          toast.error(`${errorMsg?.loc[2]} ${errorMsg.msg}`);
        });
        if (
          action.payload?.response?.data?.message &&
          !action?.payload?.response?.data?.detail
        ) {
          toast.error(action.payload.response.data.message);
        }
      });
    // Chat
    builder
      .addCase(setupChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(setupChat.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.chatResponse = payload?.chatResponse || "";
        state.experiences = payload?.experiences || [];
        state.hypothesis = payload?.hypothesis;
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
        if (payload && Object.keys(payload)?.length !== 0) {
          state.signInData = payload;
          state.customerId =
            payload?.id || "293b846f-9207-4988-b067-0fc21a2bc4b3";
        }
        toast.success("User Sign In Successfully");
        state.loading = false;
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

export const { resetOnBoardingAddSuccess, changeOnBoardingAddSuccess } =
  slice.actions;

export default slice.reducer;
