import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type NewRecipeSlice = {
  recipeStepsArray: JSX.Element[];
  numberOfrecipeSteps: number;
  message: string | null;
};
const initialState: NewRecipeSlice = {
  recipeStepsArray: [],
  numberOfrecipeSteps: 1,
  message: null,
};

const newRecipeSlice = createSlice({
  name: "recipesList",
  initialState,
  reducers: {
    addStep(state) {
      state.numberOfrecipeSteps++;
    },
  },
});

export const newRecipeSliceActions = newRecipeSlice.actions;
export default newRecipeSlice.reducer;
