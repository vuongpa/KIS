import { sessionStorageKeys } from "../redux_logic";

export const createAuthorizationHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem(sessionStorageKeys.accessToken)}`,
      },
})