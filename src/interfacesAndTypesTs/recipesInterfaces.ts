//recipes in menu list

import { ImageSrc } from "../store/slices/newRecipeSlice";

export interface IRecipesData {
  title: string;
  imgUrl: string;
  ingredients: ingredients;
  tags: Tags;
  id: string;
}

type ingredients = {
  [key: string]: [number | string, string?];
};
export type Tags = {
  type: string[];
  diet?: string[];
};

export type Recipes = Array<IRecipesData>;

//spesific recipe
export type RecipeStepType = ImageSrc & {
  stepText: string;
};
export type SpesificRecipe = {
  title: string;
  tags: Tags;
  ingredients: ingredients;
  steps: RecipeStepType[];
  mainImgSrs: ImageSrc;
};
