import axios from "axios";

export const addOption = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `https://data-entry-08031d053c68.herokuapp.com/option/saveOptions`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const getAllOptions = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `https://data-entry-08031d053c68.herokuapp.com/option/getOptions${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const deleteOption = async (data, thunkAPI) => {
  try {
    let props = await axios.delete(
      `https://data-entry-08031d053c68.herokuapp.com/option/deleteOption${data}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
