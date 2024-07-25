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
type Tags = {
  type: string[];
  diet?: string[];
};

export type Recipes = Array<IRecipesData>;
