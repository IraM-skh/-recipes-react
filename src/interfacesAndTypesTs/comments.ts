export type Comment = {
  id: string;
  idRecipe: string;
  autor: string;
  date: string;
  text: string;
  imgUrl?: string;
};

export type Comments = Array<Comment>;
