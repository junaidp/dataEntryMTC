import axios from "axios";
import { BASE_URL } from "../../../constants/index";

export const getAllProvider = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `${BASE_URL}/provider/getProviders?vendorId=${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const getAllProviderWithOutParams = async (_, thunkAPI) => {
  try {
    let props = await axios.get(`${BASE_URL}/provider/getProviders`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const getProviderByQuery = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `${BASE_URL}/provider/getProviders?name=${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const addProvider = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${BASE_URL}/provider/saveProviders`, data);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const deleteProvider = async (data, thunkAPI) => {
  try {
    let props = await axios.delete(
      `${BASE_URL}/provider/deleteProvider${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
