import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categrories: [],
  loading: false,
  hasErrors: false,
};

const listNameSlice = createSlice({
  name: 'listName',
  initialState,
  reducers: {
    getListName: state => {
      state.loading = true
    },
    getListNameSuccess: (state, action) => {
      state.categrories = action.payload
      state.loading = false
      state.hasErrors = false
    },
    getListNameFailure: state => {
      state.loading = false
      state.hasErrors = true
    }
  }
})

export const listNameReducer = listNameSlice.reducer;
export const {
  getListName,
  getListNameFailure,
  getListNameSuccess
} = listNameSlice.actions;

// Asynchronous thunk action
export function fetchListName() {
  return async dispatch => {
    dispatch(getListName())

    try {
      const response = await fetch('http://localhost:3000/listname')
      const data = await response.json();
      dispatch(getListNameSuccess(data))
    } catch (error) {
      dispatch(getListNameFailure())
    }
  }
}



