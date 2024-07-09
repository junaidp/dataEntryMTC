import axios from "axios";

export const getFlow = async (data, thunkAPI) => {
  try {
    let props = await axios.get(
      `https://data-entry-08031d053c68.herokuapp.com/flow/getFlow?exact=false&input=${data?.flowName}&previousChat=${data?.previousFlow}`
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
