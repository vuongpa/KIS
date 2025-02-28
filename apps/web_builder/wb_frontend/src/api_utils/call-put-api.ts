import axios from "axios";
import { createAuthorizationHeader } from "./create-authorization-header";
import { getBaseApiUrl } from "../config_helper";

export const callPutAPI = async (apiPath: string, bodyData: object = {}) => {
  try {
    const res = await axios.put(
      getBaseApiUrl() + apiPath,
      bodyData,
      createAuthorizationHeader()
    );
    return res;
  } catch (error) {
    console.error("Error during PUT request:", error);
    throw error;
  }
};