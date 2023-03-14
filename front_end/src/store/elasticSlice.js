import { createSlice } from "@reduxjs/toolkit";

const elasticSlice = createSlice({
  name: "elastic",
  initialState: {
    elastic: false,
  },
  reducers: {
    setElastic(state, action) {
      state.elastic = action.payload;
    },
  },
});

export const { setElastic } = elasticSlice.actions;
export default elasticSlice.reducer;
