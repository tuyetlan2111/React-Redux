import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: [],
  loading: false,
  hasErrors: false,
  searchProduct: []
};

const productSlice = createSlice({
  name: 'listName',
  initialState,
  reducers: {
    getProducts: state => {
      state.loading = true
    },
    getProuctSuccess: (state, action) => {
      state.product = action.payload
      state.loading = false
      state.hasErrors = false
    },
    getProductFailure: (state) => {
      state.loading = false
      state.hasErrors = true
    },
    getProductSearch: (state, action) => {
      state.searchProduct = action.payload
    },
  }
})

export const productReducer = productSlice.reducer;
export const {
  getProducts,
  getProuctSuccess,
  getProductFailure,
  getProductSearch,
} = productSlice.actions;

// Asynchronous thunk action
export function fetchProduct() {
  return async dispatch => {
    dispatch(getProducts())
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json()
      dispatch(getProuctSuccess(data))
    } catch (error) {
      dispatch(getProductFailure())
    }
  }
}

export function fetchSearch(key) {
  return async dispatch => {
    try {
      const response = await fetch(`http://localhost:3000/products?q=${key}`);
      const data = await response.json();
      const result = data.filter(item => item.title.toLowerCase().includes(key.toLowerCase()));
      console.log('key', key);
      console.log('data', result);

      dispatch(getProductSearch(result))
    }
    catch (error) {
      console.log('error', error);
    }
  }
}


//http://localhost:3000/products?type=cleansing