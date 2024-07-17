import { Fragment } from "react/jsx-runtime";
import RecipeCard from "../components/recipes/RecipeCard";
import getRecipesData from "../dataFromServer/Recipes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../store";
import { getRecipesData1 } from "../store/slices/recipesList";
import { useSelector } from "react-redux";

const RecipesPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRecipesData1());
  }, []);

  const recList = useSelector((state: any) => state.recipesList.recipes);
  console.log("это слайс", recList);

  return <Fragment>{/* <RecipeCard ></RecipeCard> */}</Fragment>;
};

export default RecipesPage;
