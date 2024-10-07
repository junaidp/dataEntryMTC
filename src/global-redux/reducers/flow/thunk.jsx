import axios from "axios";
import { BASE_URL } from "../../../constants/index";

export const getFlow = async (data, thunkAPI) => {
  try {
    let url;
    if (data?.previousFlow === "") {
      url = `${BASE_URL}/getFlow?exact=false&input=${data?.flowName}`;
    }
    if (data?.previousFlow && data?.previousFlow !== "") {
      url = `${BASE_URL}/flow/getFlow?exact=false&input=${data?.flowName}&previousChat=${data?.previousFlow}`;
    }
    let props = await axios.get(url);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
