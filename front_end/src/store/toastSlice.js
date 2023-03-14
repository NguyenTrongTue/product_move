import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    title: "",
    type: "",
    fade: false,
  },
  reducers: {
    fadeToast(state, action) {
      state.title = action.payload.title;
      state.type = action.payload.type;
      state.fade = action.payload.fade;
    },
    hideToast(state, action) {
      state.fade = action.payload;
    },
  },
});

export const { fadeToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
