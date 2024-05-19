import axios from "axios";

export const onBoarding = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `https://data-entry-08031d053c68.herokuapp.com/onBoard/signup`,
      {
        ...data,
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const chat = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `https://data-entry-08031d053c68.herokuapp.com/onBoard/chat`,
      {
        query: data?.query,
        session_id: data?.sessionId,
        customerId: data?.customerId || "66332bb85725cd245aab4459",
        group: data?.group,
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const signIn = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `https://data-entry-08031d053c68.herokuapp.com/onBoard/signIn${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
