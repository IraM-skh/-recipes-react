import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const generateId = (array: ImageSrc[], nameOfArray: string): string => {
  const id = nameOfArray + Math.random().toString() + Math.random().toString();
  const dubledId = array.find((el) => el.id === id);
  if (dubledId !== undefined) {
    generateId(array, nameOfArray);
  }
  return id;
};

export type ImageSrc = {
  imgSrc: string;
  id: string;
};

export type NewRecipeSlice = {
  recipeSteps: ImageSrc[];
  mainImgSrs: ImageSrc;
  numberOfIngredientFields: number;

  message: string | null;
  imgFile: any;
  tagTypes: string[];
};

const initialState: NewRecipeSlice = {
  recipeSteps: [
    {
      imgSrc: "",
      id: "recipeSteps" + Math.random().toString() + Math.random().toString(),
    },
  ],

  numberOfIngredientFields: 1,

  message: null,
  imgFile: "",
  mainImgSrs: { id: "mainImg", imgSrc: "" },
  tagTypes: ["салаты", "втроые блюда", "напитки", "десерты"],
};

const newRecipeSlice = createSlice({
  name: "recipesList",
  initialState,
  reducers: {
    addStep(state) {
      state.recipeSteps.push({
        imgSrc: "",
        id: generateId(state.recipeSteps, "recipeSteps"),
      });
    },
    removeStep(state, action: PayloadAction<string>) {
      state.recipeSteps = state.recipeSteps.filter(
        (step) => step.id !== action.payload
      );
    },
    setStepSrc(state, action: PayloadAction<ImageSrc>) {
      const step = state.recipeSteps.find(
        (step) => step.id === action.payload.id
      );
      if (step !== undefined) {
        step.imgSrc = action.payload.imgSrc;
      }
    },
    setMainImgSrs(state, action: PayloadAction<ImageSrc>) {
      state.mainImgSrs.imgSrc = action.payload.imgSrc;
    },
    addIngredientField(state) {
      state.numberOfIngredientFields++;
    },
    addTagTypeField(state) {},
    setImage(state, action) {
      state.imgFile = action.payload;
    },
  },
});

export const newRecipeSliceActions = newRecipeSlice.actions;
export default newRecipeSlice.reducer;
