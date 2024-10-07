import axios from "axios";
import { BASE_URL } from "../../../constants/index";

export const addVariation = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${BASE_URL}/variation/saveVariations`, data);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const getAllVariations = async (data, thunkAPI) => {
  try {
    let props = await axios.get(`${BASE_URL}/variation/getVariations${data}`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const getAllVariationsWithOutParams = async (_, thunkAPI) => {
  try {
    let props = await axios.get(`${BASE_URL}/variation/getVariations`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteVaration = async (data, thunkAPI) => {
  try {
    let props = await axios.delete(
      `${BASE_URL}/variation/deleteVariation${data}`
    );
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
