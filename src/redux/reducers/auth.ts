import { createSlice } from "@reduxjs/toolkit";

interface AuthSlice {
  userStatus: boolean;
  userData: object | null;
}

const initialState: AuthSlice = {
  userStatus: false,
  userData: null,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userStatus = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userStatus = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = counterSlice.actions;
export default counterSlice.reducer;
