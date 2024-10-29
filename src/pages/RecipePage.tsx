import { useParams } from "react-router";
import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getRecipeData } from "../store/slices/specificRecipeSlice";
import CommentsList from "../components/recipes/CommentsList";
import NewComment from "../components/recipes/NewComment";
import styles from "./RecipePage.module.css";
import { Link } from "react-router-dom";

const tagRender = (tags: string[], tagsType: string) => {
  return tags.map((tag, index) => {
    let searchParams = "";
    if (tagsType === "type") {
      searchParams = `sortTypes=${tag}&sortDiet=`;
    }
    if (tagsType === "diet") {
      searchParams = `sortTypes=undefined&sortDiet=${tag}`;
    }
    return (
      <Link key={tag + index} to={`/recipes?${searchParams}`}>
        {tag}
      </Link>
    );
  });
};

const RecipePage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId?: string }>();
  const dispatch = useAppDispatch();
  // let isAddNewComment = false;
  useEffect(() => {
    if (typeof recipeId === "string") {
      dispatch(getRecipeData(recipeId));
    }
  }, [recipeId]);
  const specificRecipeData = useAppSelector((state) => state.specificRecipe);
  const recipe = specificRecipeData.recipe;

  if (recipe !== null && typeof recipeId === "string") {
    const ingredients = recipe.ingredients;
    const tagsType = recipe.tags.type;
    const tagsDiet = recipe.tags.diet;

    return (
      <Fragment>
        <div className="recipe_container">
          <h3 className={styles.recipe_title}>{recipe.title}</h3>
          <p>
            Автор рецепта
            <Link to={`/pa/${specificRecipeData.recipe?.author}`}></Link>
          </p>
          <div className={styles.tags_type + " tags_type"}>
            {tagRender(tagsType, "type")}
          </div>
          {tagsDiet && (
            <div className={styles.tags_type + " tags_diet"}>
              {tagRender(tagsDiet, "diet")}
            </div>
          )}

          <img src={recipe.imgUrl} alt={recipe.title}></img>
          <h3>Ингредиенты</h3>
          <ul className={styles.ingredients_list}>
            {ingredients.map((ingridientObj, index) => {
              return (
                <li key={Object.keys(ingridientObj)[0] + index}>
                  <span className={styles.ingridient}>
                    {Object.keys(ingridientObj)[0]}
                  </span>
                  <span className={styles.ingredient_empty_space}></span>
                  <span className={styles.ingridient_quantity}>
                    {ingridientObj[Object.keys(ingridientObj)[0]].join(" ")}
                  </span>
                </li>
              );
            })}
          </ul>
          <h3>Шаги рецепта</h3>
          <div className="recipe_steps_container">
            {recipe.steps &&
              recipe.steps.map((step) => {
                return (
                  <div className={styles.recipe_step}>
                    <div className={styles.recipe_step_img_container}>
                      <img src={step.src}></img>
                    </div>
                    <p>{step.stepsDescription}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <h3>Комментарии</h3>
        <div className={styles.comments_container}>
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
