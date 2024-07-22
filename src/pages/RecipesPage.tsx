import { Fragment } from "react/jsx-runtime";
import RecipeCard from "../components/recipes/RecipeCard";
import { useEffect } from "react";

import { getRecipesData } from "../store/slices/recipesListSlice";
import { useAppSelector } from "../hooks";
import { useAppDispatch } from "../hooks";

const RecipesPage = () => {
  const recipesList = useAppSelector((state) => state.recipesList.recipes);
  const statusLoadRecipes = useAppSelector((state) => state.recipesList.status);
  const messageLoadRecipes = useAppSelector(
    (state) => state.recipesList.message
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRecipesData());
  }, []);

  return (
    <Fragment>
      {statusLoadRecipes === "loading" && <p>{messageLoadRecipes}</p>}
      {statusLoadRecipes !== "failed" &&
        recipesList.map((recipe) => {
          return <RecipeCard recipe={recipe} />;
        })}
      {statusLoadRecipes === "failed" && <p>{messageLoadRecipes}</p>}
    </Fragment>
  );
};

export default RecipesPage;
