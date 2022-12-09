import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  hasErrors: false,
  user: []
}
const userSlice = createSlice({
  name: 'listName',
  initialState,
  reducers: {
    getUser: (state) => {
      state.isLoading = true
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload
      state.hasErrors = false
      state.isLogin = true
    },
    getUserFailure: state => {
      state.isLogin = false
      state.hasErrors = true
    }
  }
})

export const userReducer = userSlice.reducer;
export const {
  getUser,
  getUserSuccess,
  getUserFailure
} = userSlice.actions;

// export const login = createAsyncThunk(
//   'user/login',
//   async (data, { rejectWithValue }) => {
//     const response = await fetch(
//       'http://localhost:3000/user',
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data)
//       }
//     )
//     // Convert dữ liệu ra json
//     const jsonData = await response.json();

//     // Nếu bị lỗi thì reject
//     if (response.status < 200 || response.status >= 300) {
//       return rejectWithValue(jsonData);
//     }

//     // Còn không thì trả về dữ liệu
//     return jsonData;
//   }
// )

export function fetchUser() {
  return async dispatch => {
    dispatch(getUser());
    try {
      const response = await fetch('http://localhost:3000/user')
      const data = await response.json();
      dispatch(getUserSuccess(data))
    } catch (error) {
      dispatch(getUserFailure())
    }
  }
}
