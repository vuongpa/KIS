import axios from "axios";
import { createAuthorizationHeader } from "./create-authorization-header";
import { getBaseApiUrl } from "../config_helper";

export const callPatchAPI = async (apiPath: string, bodyData: object = {}) => {
  try {
    const res = await axios.patch(
      getBaseApiUrl() + apiPath,
      bodyData, 
      createAuthorizationHeader()
    );
    return res;
  } catch (error) {
    console.error("Error during PATCH request:", error);
    throw error;
  }
};