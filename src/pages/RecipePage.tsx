import { useParams } from "react-router";
import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getRecipeData } from "../store/slices/specificRecipeSlice";
import CommentsList from "../components/recipes/CommentsList";
import NewComment from "../components/recipes/NewComment";

const tagRender = (tags: string[]) =>
  tags.map((tag, index) => {
    //добавить переадрессацию на страницу с включенными фильтрами
    return <a key={tag + index}>{tag}</a>;
  });

const RecipePage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId?: string }>();
  const dispatch = useAppDispatch();
  let isAddNewComment = false;
  useEffect(() => {
    if (typeof recipeId === "string") {
      dispatch(getRecipeData(recipeId));
    }
  }, [recipeId]);
  const specificRecipeData = useAppSelector((state) => state.specificRecipe);
  const recipe = specificRecipeData.recipe;

  if (recipe !== null && typeof recipeId === "string") {
    const ingridients = Object.entries(recipe.ingridients);
    const tagsType = recipe.tags.type;
    const tagsDiet = recipe.tags.diet;

    return (
      <Fragment>
        <div className="recipe_container">
          <h3>{recipe.title}</h3>
          <div className="tags_type tags_type">{tagRender(tagsType)}</div>
          {tagsDiet && (
            <div className="tags_type tags_diet">{tagRender(tagsDiet)}</div>
          )}

          <img src={recipe.imgUrl} alt={recipe.title}></img>
          <ul className="ingridients_list">
            {ingridients.map((ingridient, index) => {
              return (
                <div key={ingridient[0] + index}>
                  <span className="ingridient">{ingridient[0]}</span>
                  <span> </span>
                  <span className="ingridient_quantity">
                    {ingridient[1].join(" ")}
                  </span>
                </div>
              );
            })}
          </ul>
          <div className="recipe_steps_container">
            <p>ДОБАВИТЬ ШАГИ РЕЦЕПТА</p>
          </div>
        </div>
        <div className="comments_container">
          <CommentsList recipeId={recipeId}></CommentsList>

          <NewComment recipeId={recipeId}></NewComment>
        </div>
      </Fragment>
    );
  } else {
    return <p>{specificRecipeData.status}</p>;
  }
};

export default RecipePage;
