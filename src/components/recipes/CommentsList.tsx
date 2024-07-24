import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getRecipeCooments } from "../../store/slices/specificRecipeSlice";

const CommentsList: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRecipeCooments());
  }, []);
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
