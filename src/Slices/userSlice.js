import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthorized: false,
    users: {},
  },
  reducers: {
    setIsAuthorized: (state,action) => {
      state.isAuthorized = action.payload;
    },
    setUser: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const userAction= userSlice.actions;
export default userSlice;