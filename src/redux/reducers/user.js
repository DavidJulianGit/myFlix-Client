import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
   name: 'user',
   initialState: { userData: null, token: null },
   reducers: {
      setUserData: (state, action) => {
         localStorage.setItem('user', JSON.stringify(action.payload));
         state.userData = action.payload;
      },
      setToken: (state, action) => {
         localStorage.setItem('token', action.payload);
         state.token = action.payload;
      },
      clearUser: (state) => {
         localStorage.clear();
         state.userData = null;
         state.token = null;
      }
   }
});

export const { setUserData, setToken, clearUser } = userSlice.actions;

export default userSlice.reducer;