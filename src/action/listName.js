import { CATEGORY } from '../constants';
import { fetchListname } from "../services/fetchData";

// export const categoryIsLoading = bool => {
//   return {
//     type: CATEGORY.LOAD,
//     isLoading: bool
//   };
// };


export const fetchCategorySuccess = category => {
  return {
    type: CATEGORY.LOAD_CATEGORY_SUCCESS,
    category
  }
}


export const requestCategory = () => {
  return async dispatch => {
    // dispatch(categoryIsLoading(true));
    const category = await fetchListname();
    dispatch(fetchCategorySuccess(category));
    // dispatch(categoryIsLoading(false));
  };
};
