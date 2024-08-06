import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getRecipeCooments,
  specificRecipeSliceActions,
} from "../../store/slices/specificRecipeSlice";
import { useSelector } from "react-redux";

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
      dispatch(getRecipeCooments(props.recipeId));
      dispatch(specificRecipeSliceActions.resetNewCommentStatus());
      return;
    }
    dispatch(getRecipeCooments(props.recipeId));
  }, [isAddNewComment, props.recipeId]);
  const commentsList = useAppSelector((state) => state.specificRecipe.comments);
  return (
    <div className="comments_list_container">
      {commentsList.map((comment) => {
        return (
          <div key={"comment" + comment.id} className="comment_container">
            <p className="name_and_date_comment">
              <span>{comment.autor}</span> <span>{comment.date}</span>
            </p>
            <p className="text_comment">{comment.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsList;