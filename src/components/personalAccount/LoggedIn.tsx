import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getIsUserLoggedIn,
  getUserData,
  userDataSliceActions,
} from "../../store/slices/loginDataSlice";
import { Link } from "react-router-dom";
import CommentCard from "../recipes/CommentCard";
import { Comments } from "../../interfacesAndTypesTs/comments";
type LoggedInProps = {
  login: string;
};
const LoggedIn: React.FC<LoggedInProps> = (props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  const userData = useAppSelector((state) => state.userData);
  const hasValueOfUserData = (array: [{}] | undefined | [] | Comments) => {
    if (array === undefined) {
      return false;
    }
    if (array.length === 0) {
      return false;
    }
    return true;
  };
  const hasOwnRecipes = hasValueOfUserData(userData.ownRecipes);
  const hasFavoriteRecipes = hasValueOfUserData(userData.favoriteRecipes);
  const hasComments = hasValueOfUserData(userData.ownComments);
  const logoutHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    await fetch("../php/logout.php");
    dispatch(getIsUserLoggedIn());
    dispatch(userDataSliceActions.updateLoginStatus());
  };
  return (
    <div>
      <div className="users_profile">
        <p>{props.login}</p>
      </div>
      <button type="button" onClick={logoutHandler}>
        Выйти из профиля
      </button>
      <div className="favorite_recipes">
        <h2>Понравившиеся рецепты</h2>
        {!hasFavoriteRecipes && (
          <p>Отмечайте рецепты, которые хотите сохранить</p>
        )}
        {hasFavoriteRecipes &&
          userData.favoriteRecipes?.map((recipe) => {
            return (
              <div>
                <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                <div className="resipe_info">
                  <img src={recipe.imgUrl}></img>
                  <p>{recipe.description}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="own_recipes">
        <h2>Ваши рецепты</h2>
        {!hasOwnRecipes && (
          <p>
            Поделитесь своими рецептами с другими. Новые комментарии к Вашим
            будут подсвечиваться.
          </p>
        )}
        {hasOwnRecipes &&
          userData.ownRecipes?.map((recipe) => {
            return (
              <div>
                <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                <div className="resipe_info">
                  <img src={recipe.imgUrl}></img>
                  <p>{recipe.description}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="own_comments">
        <h2>Ваши комментарии</h2>
        {!hasComments && (
          <p>Прокомментируйте рецепт, который уже попробовали приготовить</p>
        )}
        {hasComments &&
          userData.ownComments?.map((comment) => {
            return (
              <div>
                <Link to={`/recipe/${comment.idRecipe}`}>
                  <CommentCard comment={comment} />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LoggedIn;
