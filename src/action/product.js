import { PRODUCT } from "../constants";
import { fetchProduct, fetchSearchData } from "../services/fetchData";

export const productIsLoading = bool => {
  return {
    type: PRODUCT.LOAD,
    isLoading: bool
  };
};

export const fetchDataSuccess = product => {
  return {
    type: PRODUCT.LOAD_SUCCESS,
    product
  }
}

export const requestProduct = () => {
  return async dispatch => {
    // dispatch(productIsLoading(true));
    const products = await fetchProduct();
    dispatch(fetchDataSuccess(products));
    // dispatch(productIsLoading(false));
  };
};

export const searchValue = value =>{
  return {
    type: PRODUCT.SEARCH,
    value
  };
}

export const searchProduct = (value)=>{
  return async dispatch =>{
    dispatch(searchValue(value))
    const productSearch = await fetchSearchData(value);
    dispatch(fetchDataSuccess(productSearch));
  }
}