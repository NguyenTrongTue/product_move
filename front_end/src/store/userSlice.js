import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "currentUser",
  initialState: { currentUser: null },
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
    update(state, action) {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload
      };
    },
  },
});

export const { login, logout, update } = userSlice.actions;
export default userSlice.reducer;
