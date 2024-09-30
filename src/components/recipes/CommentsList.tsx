import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getRecipeComments,
  specificRecipeSliceActions,
} from "../../store/slices/specificRecipeSlice";
import styles from "./../../pages/RecipePage.module.css";
import CommentCard from "./CommentCard";
type CommentsListProps = {
  recipeId: string;
};
const CommentsList: React.FC<CommentsListProps> = (props) => {
  const dispatch = useAppDispatch();
  const isAddNewComment = useAppSelector(
    (state) => state.specificRecipe.addNewCommentStatus
  );

  useEffect(() => {
    if (isAddNewComment) {
      dispatch(getRecipeComments(props.recipeId));
      dispatch(specificRecipeSliceActions.resetNewCommentStatus());
      return;
    }
    dispatch(getRecipeComments(props.recipeId));
  }, [isAddNewComment, props.recipeId]);
  const commentsList = useAppSelector((state) => state.specificRecipe.comments);
  return (
    <div className={styles.comments_list_container}>
      {commentsList.map((comment) => {
        return <CommentCard comment={comment} />;
      })}
    </div>
  );
};

export default CommentsList;
