export type Comment = {
  id?: string;
  idRecipe: string;
  author?: string;
  date: string;
  text: string;
  imgUrl?: string;
  isLogged?: boolean;
};

export type Comments = Array<Comment>;
