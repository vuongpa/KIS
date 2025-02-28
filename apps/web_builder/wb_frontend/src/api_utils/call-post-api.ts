import axios from "axios"
import { createAuthorizationHeader } from "./create-authorization-header"
import { getBaseApiUrl } from "../config_helper";

export const callPostAPI = async (apiPath: string, bodyData: object = {}) => {
    const res = await axios.post(
        getBaseApiUrl() + apiPath,
        bodyData,
        createAuthorizationHeader()
    );
    return res;
}