import axios from "axios";

export const getFlow = async (data, thunkAPI) => {
  try {
    let url;
    if (data?.previousFlow === "") {
      url = `https://data-entry-08031d053c68.herokuapp.com/flow/getFlow?exact=false&input=${data?.flowName}`;
    }
    if (data?.previousFlow && data?.previousFlow !== "") {
      url = `https://data-entry-08031d053c68.herokuapp.com/flow/getFlow?exact=false&input=${data?.flowName}&previousChat=${data?.previousFlow}`;
    }
    let props = await axios.get(url);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
