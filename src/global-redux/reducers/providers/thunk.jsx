import axios from "axios";

export const getAllProvider = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `https://data-entry-08031d053c68.herokuapp.com/provider/getProviders?vendorId=${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const getAllProviderWithOutParams = async (_, thunkAPI) => {
  try {
    let props = await axios.get(
      `https://data-entry-08031d053c68.herokuapp.com/provider/getProviders`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const getProviderByQuery = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `https://data-entry-08031d053c68.herokuapp.com/provider/getProviders?name=${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const addProvider = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `https://data-entry-08031d053c68.herokuapp.com/provider/saveProviders`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const deleteProvider = async (data, thunkAPI) => {
  try {
    let props = await axios.delete(
      `https://data-entry-08031d053c68.herokuapp.com/provider/deleteProvider${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
