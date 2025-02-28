// @ts-ignore
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchData } from '../../../types';

const initialState: SearchData = {
  keyword: '',
};

const name = 'searchData';

const searchSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
  }
});

export const {
  setSearchKeyword,
} = searchSlice.actions;

export const withSearchDataReducer = (reducers: any) => {
  reducers[name] = searchSlice.reducer;
  return reducers;
};

export const selectSearchData = (rootState: any): SearchData => rootState[name];
export const selectSearchKeyword = (rootState: any): string => rootState[name].keyword;
