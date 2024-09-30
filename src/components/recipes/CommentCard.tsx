import styles from "./../../pages/RecipePage.module.css";
import { Comment } from "../../interfacesAndTypesTs/comments";
type CommentCardProps = {
  comment: Comment;
};

const CommentCard: React.FC<CommentCardProps> = (props) => {
  return (
    <div
      key={"comment" + props.comment.id}
      className={styles.comment_container}
    >
      <p className={styles.name_and_date_comment}>
        <span>{props.comment.author}</span>{" "}
        <span className={styles.date_comment}>{props.comment.date}</span>
      </p>
      <p className={styles.text_comment}>{props.comment.text}</p>
    </div>
  );
};

export default CommentCard;
