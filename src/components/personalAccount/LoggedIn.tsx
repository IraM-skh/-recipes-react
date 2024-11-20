import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getIsUserLoggedIn,
  getUserData,
  userDataSliceActions,
} from "../../store/slices/loginDataSlice";
import { Link } from "react-router-dom";
import CommentCard from "../recipes/CommentCard";
import { Comments } from "../../interfacesAndTypesTs/comments";
import { nameFolderOnServer } from "../../App";
import styles from "../../pages/PersonalAccountPage.module.css";
import NoImg from "../NoImg";
type LoggedInProps = {
  loginFromCookie: string;
  loginFromUrl: string | undefined;
};
const LoggedIn: React.FC<LoggedInProps> = (props) => {
  const dispatch = useAppDispatch();
  const isOwner: boolean = props.loginFromUrl ? false : true;
  useEffect(() => {
    if (props.loginFromUrl !== undefined) {
      dispatch(getUserData(props.loginFromUrl));
    } else {
      dispatch(getUserData(props.loginFromCookie));
    }
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
    await fetch(`../${nameFolderOnServer}/php/logout.php`);
    dispatch(getIsUserLoggedIn());
    dispatch(userDataSliceActions.updateLoginStatus());
  };
  return (
    <div className={styles.account_info}>
      {userData.errorUserInfo && (
        <p className="error">Пользователь не найден</p>
      )}
      {!userData.errorUserInfo && (
        <Fragment>
          <div className={styles.nickname_container}>
            <div className="users_profile">
              {isOwner && <p>{props.loginFromCookie}</p>}
              {!isOwner && <p>{props.loginFromUrl}</p>}
            </div>
            {isOwner && (
              <button
                type="button"
                onClick={logoutHandler}
                className={styles.logout_btn}
              >
                Выйти из профиля
              </button>
            )}
          </div>
          <div className="own_recipes">
            <h2>Ваши рецепты</h2>
            {!hasOwnRecipes && isOwner && (
              <p>Поделитесь своими рецептами с другими.</p>
            )}
            {!hasOwnRecipes && !isOwner && (
              <p>Пользователь не загружал рецепты.</p>
            )}
            {hasOwnRecipes &&
              userData.ownRecipes?.map((recipe) => {
                return (
                  <div className={styles.recipe_container}>
                    <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                    <div className={styles.resipe_info}>
                      {!recipe.imgUrl && <NoImg />}
                      {recipe.imgUrl && (
                        <div className={styles.img_container}>
                          <img src={recipe.imgUrl}></img>
                        </div>
                      )}
                      <p>{recipe.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="own_comments">
            <h2>Ваши комментарии</h2>
            {!hasComments && isOwner && (
              <p>
                Прокомментируйте рецепт, который уже попробовали приготовить.
              </p>
            )}
            {!hasComments && !isOwner && (
              <p>Пользователь не оставлял комментариев.</p>
            )}
            {hasComments &&
              userData.ownComments?.map((comment) => {
                return (
                  <div className={styles.comment_container}>
                    <Link to={`/recipe/${comment.idRecipe}`}>
                      <CommentCard comment={comment} />
                    </Link>
                  </div>
                );
              })}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default LoggedIn;
