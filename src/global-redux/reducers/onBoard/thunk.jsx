import axios from "axios";
import { BASE_URL } from "../../../constants/index";

export const onBoarding = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`http://195.35.1.22:8003/process_data/`, data);
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
