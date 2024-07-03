import axios from "axios";

export const getFlow = async (_, thunkAPI) => {
  try {
    let props = await axios.get(
      `https://data-entry-08031d053c68.herokuapp.com/flow/getFlow?exact=false&input=payroll`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
