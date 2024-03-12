import axios from "axios";

export const getAllExperience = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `https://data-entry-08031d053c68.herokuapp.com/experience/getExperiences?vendorId=${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const addExperience = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `https://data-entry-08031d053c68.herokuapp.com/experience/saveExperiences`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
