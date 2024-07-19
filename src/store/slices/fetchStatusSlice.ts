import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type FetchStatus = {
  status: string | null;
  message: string | null;
};
const initialState: FetchStatus = {
  status: null,
  message: null,
};

const fetchStatusSlice = createSlice({
  name: "recipesList",
  initialState,
  reducers: {
    showStatusMessage(state, action: PayloadAction<FetchStatus>) {
      console.log(action.payload, "выавыаовылавлыоавоыл");
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});

export const fetchStatusSliceActions = fetchStatusSlice.actions;
export default fetchStatusSlice.reducer;
