import { createSlice } from "@reduxjs/toolkit";

const fetchStatusSlice = createSlice({
  name: "recipesList",
  initialState: {
    status: "",
    title: "",
    message: "",
  },
  reducers: {
    showStatusMessage(state, action) {
      state.status = action.payload.status;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
  },
});

export const fetchStatusSliceActions = fetchStatusSlice.actions;
export default fetchStatusSlice.reducer;
