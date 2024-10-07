import axios from "axios";
import { BASE_URL } from "../../../constants/index";

export const getAllVendors = async (_, thunkAPI) => {
  try {
    let props = await axios.get(`${BASE_URL}/vendor/getVendors`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const searchVendorByQuery = async (data, thunkAPI) => {
  try {
    let props = await axios.get(`${BASE_URL}/vendor/getVendors?name=${data}`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const addVendor = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${BASE_URL}/vendor/saveVendor`, data);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteVendor = async (data, thunkAPI) => {
  try {
    let props = await axios.delete(`${BASE_URL}/vendor/deleteVendor${data}`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
