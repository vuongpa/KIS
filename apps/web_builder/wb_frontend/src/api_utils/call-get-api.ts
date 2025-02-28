import axios from "axios"
import { createAuthorizationHeader } from "./create-authorization-header"
import { getBaseApiUrl } from "../config_helper";

export const callGetAPI = async (apiPath: string) => {
    const res = await axios.get(
        getBaseApiUrl() + apiPath,
        createAuthorizationHeader()
    );
    return res;
}