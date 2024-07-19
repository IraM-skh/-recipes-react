import { Fragment } from "react/jsx-runtime";
import RecipeCard from "../components/recipes/RecipeCard";
import { useEffect } from "react";

import { getRecipesData } from "../store/slices/recipesListSlice";
import { useAppSelector } from "../hooks";
import { useAppDispatch } from "../hooks";

const RecipesPage = () => {
  const recipesList = useAppSelector((state) => state.recipesList.recipes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRecipesData());
  }, []);
  const fetchStatus = useAppSelector((state) => state.status);
  console.log(recipesList, "из страницы");

  return (
    <Fragment>
      {recipesList.map((recipe) => {
        return <p>{recipe.title}</p>;
      })}
      <p>{fetchStatus.message} Это должен быть статус</p>
    </Fragment>
  );
};

export default RecipesPage;
