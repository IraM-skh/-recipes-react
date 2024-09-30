//recipes in menu list

import { ImageSrc } from "../store/slices/newRecipeSlice";

export interface IRecipesData {
  title: string;
  imgUrl: string;
  id: string;
  ingredients: [ingredients];
  tags: Tags;
  steps?: Array<{
    src: string;
    stepsDescription: string;
  }>;
  description?: string;
}

export type ingredients = {
  [key: string]: [string, string?];
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
  ingredients: Array<{
    ingredient: string;
    ingredientQuantitie: string;
    ingredientMeasurement: string;
  }>;
  steps: RecipeStepType[];
  mainImgSrs?: ImageSrc;
  description: string;
};

export type StepsForSending = { id: string; stepText: string };

export type SpesificRecipeForSending = {
  title: string;
  tags: Tags;
  ingredients: Array<{
    ingredient: string;
    ingredientQuantitie: string;
    ingredientMeasurement: string;
  }>;
  steps: StepsForSending[];
  mainImgSrs?: ImageSrc;
  description: string;
};
