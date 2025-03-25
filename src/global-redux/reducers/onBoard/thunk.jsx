import axios from "axios";
import { BASE_URL } from "../../../constants/index";

export const onBoardingFirstCall = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `https://abrj.pythonanywhere.com/process_data/`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const onBoardingSecondCall = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `https://tripplanning-frosty-waterfall-7876.fly.dev/generate_response/`,
      {
        input_data: {
          ...data,
        },
      },
      { timeout: 1800000 }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const chat = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${BASE_URL}/onBoard/chat`, {
      query: data?.query,
      session_id: data?.sessionId,
      customerId: data?.customerId || "66332bb85725cd245aab4459",
      group: data?.group,
    });
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const signIn = async (data, thunkAPI) => {
  try {
    let props = await axios.get(`${BASE_URL}/onBoard/signIn${data}`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
