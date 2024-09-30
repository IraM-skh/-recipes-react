import React, { useEffect } from "react";
import { Comment } from "../../interfacesAndTypesTs/comments";
import { useAppDispatch } from "../../hooks";
import { sendRecipeComment } from "../../store/slices/specificRecipeSlice";
import styles from "../../pages/RecipePage.module.css";

type NewCommentProps = {
  recipeId: string;
};

const NewComment: React.FC<NewCommentProps> = (props) => {
  const nameNewComment = React.createRef<HTMLInputElement>();
  const nameTextComment = React.createRef<HTMLTextAreaElement>();
  const dispatch = useAppDispatch();

  const submitFormNewCommentHandler: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    const commentDate = {
      date: new Date(),
      toTwoDigit(date: number) {
        if (date < 10) {
          return "0" + date.toString();
        } else {
          return date.toString();
        }
      },
      getStringDate() {
        return (
          this.toTwoDigit(this.date.getDate()) +
          "." +
          this.toTwoDigit(this.date.getMonth() + 1) +
          "." +
          this.date.getFullYear().toString()
        );
      },
    };
    //добавить Отправку формы
    if (nameNewComment.current && nameTextComment.current) {
      const comment: Comment = {
        id:
          Math.random().toString() +
          Math.random().toString() +
          Math.random().toString() +
          Math.random().toString(),
        idRecipe: props.recipeId,
        author: nameNewComment.current.value,
        date: commentDate.getStringDate(),
        text: nameTextComment.current.value,
      };

      dispatch(sendRecipeComment(comment));

      nameNewComment.current.value = "";
      nameTextComment.current.value = "";
    }
  };

  return (
    //добавить загрузку изображения
    <form onSubmit={submitFormNewCommentHandler}>
      <div className={styles.name_form_comment}>
        <label htmlFor="name">Ваше имя:</label>
        <input type="text" id="name" ref={nameNewComment} required />
      </div>
      <div className={styles.text_form_comment}>
        <label htmlFor="text">Ваш комментарий:</label>
        <textarea id="text" ref={nameTextComment} required></textarea>
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default NewComment;
