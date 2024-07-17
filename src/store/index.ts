import { configureStore } from "@reduxjs/toolkit";
import fetchStatusSlice from "./slices/fetchStatus";
import recipesListSlice from "./slices/recipesList";

const store = configureStore({
  reducer: {
    status: fetchStatusSlice,
    recipesList: recipesListSlice,
  },
});
export const useAppDispatch = () => store.dispatch;
export default store;
