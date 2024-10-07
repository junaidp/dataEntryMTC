import axios from "axios";
import { BASE_URL } from "../../../constants/index";

export const getAllExperience = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `${BASE_URL}/experience/getExperiences?vendorId=${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllExperienceWithOutParams = async (_, thunkAPI) => {
  try {
    let props = await axios.get(`${BASE_URL}/experience/getExperiences`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const getExperienceWithQuerySearch = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `${BASE_URL}/experience/getExperiences?name=${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const addExperience = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `${BASE_URL}/experience/saveExperiences`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const addDuplicateExperience = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `${BASE_URL}/experience/saveExperiences`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const deleteExperience = async (data, thunkAPI) => {
  try {
    let props = await axios.delete(
      `${BASE_URL}/experience/deleteExperience${data}`
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
