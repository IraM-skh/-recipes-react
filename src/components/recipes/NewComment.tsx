import React from "react";

const NewComment: React.FC = () => {
  const nameNewComment = React.createRef<HTMLInputElement>();
  const nameTextComment = React.createRef<HTMLTextAreaElement>();
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
    console.log(nameNewComment.current?.value);
    console.log(nameTextComment.current?.value);
    console.log(commentDate.getStringDate());
  };
  return (
    //добавить загрузку изображения
    <form onSubmit={submitFormNewCommentHandler}>
      <div className="name_form_comment">
        <label htmlFor="name">Ваше имя:</label>
        <input type="text" id="name" ref={nameNewComment} required />
      </div>
      <div className="text_form_comment">
        <label htmlFor="text">Text</label>
        <textarea id="text" ref={nameTextComment} required></textarea>
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default NewComment;
