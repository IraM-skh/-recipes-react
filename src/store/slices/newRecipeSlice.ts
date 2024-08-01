import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type NewRecipeSlice = {
  recipeStepsArray: JSX.Element[];
  numberOfrecipeStepFields: number;
  numberOfIngredientFields: number;
  numberOfTagTypeFields: number;
  message: string | null;
  imgFile: any;
  imgSrc: string;
};
const initialState: NewRecipeSlice = {
  recipeStepsArray: [],
  numberOfrecipeStepFields: 1,
  numberOfIngredientFields: 1,
  numberOfTagTypeFields: 1,
  message: null,
  imgFile: "",
  imgSrc: "",
};

const newRecipeSlice = createSlice({
  name: "recipesList",
  initialState,
  reducers: {
    addStepFields(state) {
      state.numberOfrecipeStepFields++;
    },
    addIngredientField(state) {
      state.numberOfIngredientFields++;
    },
    addTagTypeField(state) {
      state.numberOfTagTypeFields++;
    },
    setImage(state, action) {
      state.imgFile = action.payload;
    },
    setImageSrc(state, action) {
      state.imgSrc = action.payload;
    },
  },
});

export const newRecipeSliceActions = newRecipeSlice.actions;
export default newRecipeSlice.reducer;
