interface IRecipesData {
  title: string;
  imgUrl: string;
  ingridients: Ingridients;
  tags: Tags;
}

type Ingridients = {
  [key: string]: [number | string, string?];
};
type Tags = {
  type: string[];
  diet: string[];
};

export type Recipes = Array<IRecipesData>;
