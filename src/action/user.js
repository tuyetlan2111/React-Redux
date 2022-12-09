import { USER } from '../constants';
import { fetchGetUser } from '../services/fetchData';

export const userIsLoading = bool =>{
  return{
    type: USER.LOGIN_REQUEST,
    isLoading: bool
  }
}

export const fetchUserSuccess = user => {
  return {
    type: USER.LOGIN_SUCCESS,
    user
  }
}

export const requestUser = () => {
  return async dispatch => {
    dispatch(userIsLoading(true));
    const user = await fetchGetUser();
    dispatch(fetchUserSuccess(user));
    dispatch(userIsLoading(false));
  };
};