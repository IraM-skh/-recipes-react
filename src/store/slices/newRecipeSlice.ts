import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const generateId = (
  array: ImageSrc[] | string[],
  nameOfArray: string
): string => {
  const id = nameOfArray + Math.random().toString() + Math.random().toString();
  let dubledId = undefined;
  if (typeof array[0] === "string") {
    dubledId = (array as string[]).find((el) => el === id);
  } else {
    dubledId = (array as ImageSrc[]).find((el) => el.id === id);
  }

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
  IngredientFieldsId: string[];
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
  IngredientFieldsId: [
    "ingredientId" + Math.random().toString() + Math.random().toString(),
  ],
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
    addIngredientField(state) {
      state.IngredientFieldsId.push(
        generateId(state.IngredientFieldsId, "ingredientId")
      );
    },
    removeIngredientField(state, action: PayloadAction<string>) {
      state.IngredientFieldsId = state.IngredientFieldsId.filter(
        (idField) => idField !== action.payload
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
    setImage(state, action) {
      state.imgFile = action.payload;
    },
  },
});

export const newRecipeSliceActions = newRecipeSlice.actions;
export default newRecipeSlice.reducer;
