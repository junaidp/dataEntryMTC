import axios from "axios";
import { BASE_URL } from "../../../constants/index";

export const getAllService = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `${BASE_URL}/services/getServices?vendorId=${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const getAllServiceWithOutParama = async (data, thunkAPI) => {
  try {
    let props = await axios.get(`${BASE_URL}/services/getServices`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllServicesWithQuery = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `${BASE_URL}/services/getServices?name=${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const addService = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${BASE_URL}/services/saveServices`, data);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const deleteService = async (data, thunkAPI) => {
  try {
    let props = await axios.delete(`${BASE_URL}/services/deleteService${data}`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
