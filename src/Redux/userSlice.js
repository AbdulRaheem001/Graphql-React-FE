import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    loginState: false,
    email: ""
  },
  reducers: {
    setLoginState(state, action) {
      state.loginState = action.payload;
    },
    setEmailState(state, action) {
      state.email = action.payload;
    },
  },
});
export default userSlice;
export const { setLoginState,setEmailState } = userSlice.actions;
