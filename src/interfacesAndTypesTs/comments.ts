export type Comment = {
  id: string;
  autor: string;
  date: string;
  text: string;
  imgUrl?: string;
};

export type Comments = Array<Comment>;
