import axios from "axios";
import { createAuthorizationHeader } from "./create-authorization-header";
import { getBaseApiUrl } from "../config_helper";

export const callDeleteAPI = async (apiPath: string) => {
  try {
    const res = await axios.delete(
      getBaseApiUrl() + apiPath,
      createAuthorizationHeader()
    );
    return res;
  } catch (error) {
    console.error("Error during DELETE request:", error);
    throw error;
  }
};