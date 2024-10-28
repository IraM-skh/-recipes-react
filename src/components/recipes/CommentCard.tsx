import styles from "./../../pages/RecipePage.module.css";
import { Comment } from "../../interfacesAndTypesTs/comments";
import { Link } from "react-router-dom";
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
        {props.comment.isLogged && (
          <Link to={`/pa/${props.comment.author}`}>{props.comment.author}</Link>
        )}
        {!props.comment.isLogged && (
          <span className={styles.author_comment}>{props.comment.author}</span>
        )}
        <span className={styles.date_comment}>{props.comment.date}</span>
      </p>
      <p className={styles.text_comment}>{props.comment.text}</p>
    </div>
  );
};

export default CommentCard;
