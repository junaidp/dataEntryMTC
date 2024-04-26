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
        previousChat: data?.previousChat,
        ai: data?.type,
        customerId: data?.customerId || "",
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
