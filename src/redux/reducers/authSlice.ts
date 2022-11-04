import {createSlice} from '@reduxjs/toolkit';
const initialState = null;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    logout: state => {
      return initialState;
    },
  },
});

export const selectAuthUser = state => state.auth;

export const {setUser, logout} = authSlice.actions;

export default authSlice.reducer;
