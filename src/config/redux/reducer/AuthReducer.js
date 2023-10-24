import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  error: '',
  status: '',
};
const AuthReducer = createSlice({
    name: 'AuthReducer',
    // initialState,
    initialState,
    reducers: {
        userDataFromAsyncStorage: (state, action) => {
            state.userData = action.payload;
            console.log('data set in reducer', state.userData)
        },
        removeUserDataFromAsyncStorage: (state, action) => {
            state.userData = null;
        },
    },
});

export default AuthReducer.reducer;
export const { userDataFromAsyncStorage, removeUserDataFromAsyncStorage } =
    AuthReducer.actions;