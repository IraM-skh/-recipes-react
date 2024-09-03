import { Fragment } from "react/jsx-runtime";
import RecipeCard from "../components/recipes/RecipeCard";
import { useEffect } from "react";

import { getRecipesData } from "../store/slices/recipesListSlice";
import { useAppSelector } from "../hooks";
import { useAppDispatch } from "../hooks";
import { useHistory, useLocation } from "react-router";
import { getTagsData } from "../store/slices/recipesDetailsSlice";
import { Recipes } from "../interfacesAndTypesTs/recipesInterfaces";

import stylesCreateRecipe from "./CreateRecipePage.module.css";
import styles from "./RecipesPage.module.css";
const RecipesPage = () => {
  //-----types
  type filterTagsForm = {
    menuTagsType: NodeListOf<HTMLInputElement>;
    menuTagsDiet: NodeListOf<HTMLInputElement>;
  };
  //---------
  const url = useLocation();
  const history = useHistory();
  const recipesList = useAppSelector((state) => state.recipesList.recipes);
  const statusLoadRecipes = useAppSelector((state) => state.recipesList.status);
  const tags = useAppSelector((state) => state.recipesDetails.tags.tags);

  const messageLoadRecipes = useAppSelector(
    (state) => state.recipesList.message
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRecipesData());

    if (tags === null) {
      dispatch(getTagsData());
    }
  }, []);

  //handlers
  const applayFilterHandler: React.FormEventHandler<
    HTMLFormElement & filterTagsForm
  > = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const checkedTypes: HTMLInputElement[] = [];
    const checkedDiet: HTMLInputElement[] = [];
    form.menuTagsType.forEach((input) => {
      if (input.checked) {
        checkedTypes.push(input);
      }
    });
    form.menuTagsDiet.forEach((input) => {
      if (input.checked) {
        checkedDiet.push(input);
      }
    });

    if (checkedTypes.length || checkedDiet.length) {
      let sortTypes,
        sortDiet = "";
      if (checkedTypes.length) {
        sortTypes = checkedTypes.map((input) => input.value).join(",");
      }
      if (checkedDiet.length) {
        sortDiet = checkedDiet.map((input) => input.value).join(",");
      }

      history.push({
        pathname: url.pathname,
        search: `?sortTypes=${sortTypes}&sortDiet=${sortDiet}`,
      });
    } else {
      if (url.pathname) {
        history.push(url.pathname);
      }
    }
  };
  const searchUrlParams = new URLSearchParams(url.search);
  //массивы с параметрами url
  const sortTypes = searchUrlParams.get("sortTypes")?.split(",");
  const sortDiet = searchUrlParams.get("sortDiet")?.split(",");
  let sortRecipesList: Recipes = [];
  if (sortTypes || sortDiet) {
    console.log("Сортировка по", sortTypes, sortDiet);
    sortRecipesList.push(
      ...recipesList.filter((recipe) => {
        if (
          sortDiet &&
          (sortDiet[0].length == 0 || sortDiet[0] === "undefined") &&
          sortTypes?.filter((sortType) =>
            recipe.tags.type
              .map((type) => type.toLowerCase())
              .includes(sortType)
          ).length === sortTypes?.length
        ) {
          return true;
        }

        if (
          recipe.tags.diet &&
          sortTypes &&
          (sortTypes[0].length == 0 || sortTypes[0] === "undefined") &&
          sortDiet?.filter((diet) => {
            return (
              recipe.tags.diet &&
              recipe.tags.diet.map((type) => type.toLowerCase()).includes(diet)
            );
          }).length === sortDiet?.length
        ) {
          return true;
        }
        if (
          sortTypes &&
          sortDiet &&
          recipe.tags.diet &&
          sortTypes?.filter((sortType) =>
            recipe.tags.type
              .map((type) => type.toLowerCase())
              .includes(sortType)
          ).length === sortTypes?.length &&
          sortDiet?.filter((diet) => {
            return (
              recipe.tags.diet &&
              recipe.tags.diet.map((type) => type.toLowerCase()).includes(diet)
            );
          }).length === sortDiet?.length
        ) {
          return true;
        }
        return false;
      })
    );
  }

  return (
    <Fragment>
      <form className="filter_tags" onSubmit={applayFilterHandler}>
        <div className={stylesCreateRecipe.tag_types_container}>
          {tags &&
            tags.type.map((type) => {
              return (
                <label
                  key={`type` + type}
                  className={stylesCreateRecipe.checkbox_label}
                >
                  <input
                    type="checkbox"
                    name="menuTagsType"
                    value={type}
                  ></input>
                  <span className={stylesCreateRecipe.custom_checkbox}>
                    {type}
                  </span>
                </label>
              );
            })}
        </div>
        <div
          className={
            stylesCreateRecipe.tag_types_container +
            " " +
            styles.tag_diet_container
          }
        >
          {tags &&
            tags.diet &&
            tags.diet.map((type) => {
              return (
                <label
                  key={`type` + type}
                  className={stylesCreateRecipe.checkbox_label}
                >
                  <input
                    type="checkbox"
                    name="menuTagsDiet"
                    value={type}
                  ></input>
                  <span className={stylesCreateRecipe.custom_checkbox}>
                    {type}
                  </span>
                </label>
              );
            })}
        </div>
        <button type="submit">Применить фильтр</button>
      </form>
      {statusLoadRecipes === "loading" && <p>{messageLoadRecipes}</p>}
      {statusLoadRecipes !== "failed" &&
        !url.search &&
        recipesList.map((recipe, index) => {
          return <RecipeCard key={recipe.id + index} recipe={recipe} />;
        })}
      {statusLoadRecipes === "failed" && <p>{messageLoadRecipes}</p>}
      {statusLoadRecipes !== "failed" &&
        url.search &&
        sortRecipesList.map((recipe, index) => {
          return <RecipeCard key={recipe.id + index} recipe={recipe} />;
        })}
      {statusLoadRecipes === "failed" && <p>{messageLoadRecipes}</p>}
    </Fragment>
  );
};

export default RecipesPage;
