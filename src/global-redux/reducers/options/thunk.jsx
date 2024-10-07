import axios from "axios";
import { BASE_URL } from "../../../constants/index";

export const addOption = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${BASE_URL}/option/saveOptions`, data);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllOptions = async (data, thunkAPI) => {
  try {
    let props = await axios.get(`${BASE_URL}/option/getOptions${data}`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const getAllOptionsWithOutParams = async (_, thunkAPI) => {
  try {
    let props = await axios.get(`${BASE_URL}/option/getOptions`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const deleteOption = async (data, thunkAPI) => {
  try {
    let props = await axios.delete(`${BASE_URL}/option/deleteOption${data}`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const editProvider = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${BASE_URL}/provider/saveProviders`, data);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
