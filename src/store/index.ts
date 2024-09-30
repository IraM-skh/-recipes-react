import { configureStore } from "@reduxjs/toolkit";
import fetchStatusSlice from "./slices/fetchStatusSlice";
import recipesListSlice from "./slices/recipesListSlice";
import specificRecipeSlice from "./slices/specificRecipeSlice";
import newRecipeSlice from "./slices/newRecipeSlice";
import recipesDetailsSlice from "./slices/recipesDetailsSlice";
import userDataSlice from "./slices/loginDataSlice";
const store = configureStore({
  reducer: {
    status: fetchStatusSlice,
    recipesList: recipesListSlice,
    specificRecipe: specificRecipeSlice,
    newRecipe: newRecipeSlice,
    recipesDetails: recipesDetailsSlice,
    userData: userDataSlice,
  },
});

export const useAppDispatch = () => store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
