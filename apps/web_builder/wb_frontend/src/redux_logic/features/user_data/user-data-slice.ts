// @ts-ignore
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../../types';

export const sessionStorageKeys: {
  [key: string]: string
} = {
  isLoggedIn: 'isLoggedIn',
  accessToken: 'accessToken',
  userId: 'userId',
  userName: 'userName',
};

const initialState: UserData = {
  isLoggedIn: localStorage.getItem(sessionStorageKeys.isLoggedIn) === 'true',
  accessToken: localStorage.getItem(sessionStorageKeys.accessToken) ?? '',
  userId: localStorage.getItem(sessionStorageKeys.userId) ?? '',
  userName: localStorage.getItem(sessionStorageKeys.userName) ?? '',
};

const name = 'userData';

const userDataSlice = createSlice({
  name,
  initialState,
  reducers: {
    setData(state: UserData, action: PayloadAction<Partial<UserData>>) {
      const newState = {
        ...state,
        ...action.payload
      };

      for (const key in newState) {
        if (!Object.prototype.hasOwnProperty.call(newState, key)) continue;
        if (!sessionStorageKeys[key]) continue;
        localStorage.setItem(key, (newState as any)[key] + '');
      }

      return newState;
    },
    logOut(state: UserData, _action: PayloadAction<undefined>) {
      const newState = {
        ...state,
        isLoggedIn: false,
        accessToken: '',
        userId: '',
        userName: '',
      }

      for (const key in newState) {
        if (!Object.prototype.hasOwnProperty.call(newState, key)) continue;
        if (!sessionStorageKeys[key]) continue;
        localStorage.removeItem(key);
      }

      return newState;
    },
    setAccessToken(state: UserData, action: PayloadAction<string>) {
      const newAccessToken = action.payload;
      state.accessToken = newAccessToken;
      localStorage.setItem(sessionStorageKeys.accessToken, newAccessToken);
      return state;
    }
  }
});

export const {
  setData,
  logOut,
  setAccessToken,
} = userDataSlice.actions;

export const withUserDataReducer = (reducers: any) => {
  reducers[name] = userDataSlice.reducer;
  return reducers;
};

export const selectUserData = (rootState: any): UserData => rootState[name];

export const selectIsLoggedIn = (rootState: any): boolean => {
  return selectUserData(rootState).isLoggedIn;
}

export const selectAccessToken = (rootState: any): string => {
  return selectUserData(rootState).accessToken;
}