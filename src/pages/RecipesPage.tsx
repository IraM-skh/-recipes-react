import { Fragment } from "react/jsx-runtime";
import RecipeCard from "../components/recipes/RecipeCard";
import { useEffect, useState } from "react";
import { getRecipesData } from "../store/slices/recipesListSlice";
import { useAppSelector } from "../hooks";
import { useAppDispatch } from "../hooks";
import { useHistory, useLocation } from "react-router";
import { getTagsData } from "../store/slices/recipesDetailsSlice";
import { Recipes } from "../interfacesAndTypesTs/recipesInterfaces";

import stylesCreateRecipe from "./CreateRecipePage.module.css";
import styles from "./RecipesPage.module.css";
import Checkbox from "../components/recipes/Checkbox";
const RecipesPage = () => {
  //-----types
  type filterTagsForm = {
    menuTagsType: NodeListOf<HTMLInputElement>;
    menuTagsDiet: NodeListOf<HTMLInputElement>;
  };
  //----state, url, dispatch

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
  const changePageHandler: React.FormEventHandler<HTMLButtonElement> = (
    event
  ) => {
    searchUrlParams.set("page", event.currentTarget.value);
    history.push({
      pathname: url.pathname,
      search: searchUrlParams.toString(),
    });
  };

  //массивы с параметрами url
  const pageNumberFromUrl = searchUrlParams.get("page");
  const sortTypes = searchUrlParams.get("sortTypes")?.split(",");
  const sortDiet = searchUrlParams.get("sortDiet")?.split(",");

  let sortRecipesList: Recipes = [];
  if (sortTypes || sortDiet) {
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

  //pagination
  const pageBtnLimit = 5;
  const limitRecipesOnPage = 2;
  let numberOfRec: number;
  if (sortRecipesList.length > 0) {
    numberOfRec = sortRecipesList.length;
  } else {
    numberOfRec = recipesList.length;
  }
  const paginationArrey: number[] = [];

  const numberOfPages =
    numberOfRec % limitRecipesOnPage
      ? Math.floor(numberOfRec / limitRecipesOnPage) + 1
      : numberOfRec / limitRecipesOnPage;
  const pageNumber = pageNumberFromUrl ? Number(pageNumberFromUrl) : 1;

  let startBntPagination = 0;
  let endBtnPagination = 0;

  if (pageNumber <= Math.round(pageBtnLimit / 2)) {
    startBntPagination = 1;
    endBtnPagination = pageBtnLimit;
  } else if (pageNumber > numberOfPages - Math.round(pageBtnLimit / 2)) {
    startBntPagination = numberOfPages - pageBtnLimit + 1;
    endBtnPagination = numberOfPages;
  } else {
    startBntPagination = pageNumber - Math.round(pageBtnLimit / 2) + 1;
    endBtnPagination = pageNumber + Math.round(pageBtnLimit / 2) - 1;
  }

  for (let index = startBntPagination; index <= endBtnPagination; index++) {
    paginationArrey.push(index);
  }
  //final recipes list with pagination
  let finalRecipeList: Recipes = [];
  const getFinalRecipeList = (recipesList: Recipes) => {
    const endInd = limitRecipesOnPage * pageNumber;
    const startInd = endInd - limitRecipesOnPage + 1;
    return recipesList.slice(startInd - 1, endInd);
  };
  if (sortRecipesList.length > 0) {
    finalRecipeList = getFinalRecipeList(sortRecipesList);
  } else {
    finalRecipeList = getFinalRecipeList(recipesList);
  }

  return (
    <Fragment>
      <form className="filter_tags" onSubmit={applayFilterHandler}>
        <div className={stylesCreateRecipe.tag_types_container}>
          {tags &&
            tags.type.map((type) => {
              console.log(sortTypes && sortTypes.includes(type));
              return (
                <label
                  key={`type` + type}
                  className={stylesCreateRecipe.checkbox_label}
                >
                  {sortTypes && sortTypes.includes(type) ? (
                    <Checkbox value={type} name="menuTagsType" />
                  ) : (
                    <input
                      type="checkbox"
                      name="menuTagsType"
                      value={type}
                    ></input>
                  )}

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
                  {sortDiet && sortDiet.includes(type) ? (
                    <Checkbox value={type} name="menuTagsDiet" />
                  ) : (
                    <input
                      type="checkbox"
                      name="menuTagsDiet"
                      value={type}
                    ></input>
                  )}

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
        finalRecipeList.map((recipe, index) => {
          return <RecipeCard key={recipe.id + index} recipe={recipe} />;
        })}
      {statusLoadRecipes === "failed" && <p>{messageLoadRecipes}</p>}
      <div className={styles.pagination_container}>
        {paginationArrey.map((number) => {
          if (pageNumberFromUrl && number === Number(pageNumber)) {
            return (
              <button
                className={
                  styles.page_btn +
                  " page_" +
                  number +
                  " " +
                  styles.active_page_btn
                }
                onClick={changePageHandler}
                type="button"
                value={number}
              >
                {number}
              </button>
            );
          }
          if (!pageNumberFromUrl && number === 1) {
            return (
              <button
                className={
                  styles.page_btn +
                  " page_" +
                  number +
                  " " +
                  styles.active_page_btn
                }
                onClick={changePageHandler}
                type="button"
                value={number}
              >
                {number}
              </button>
            );
          }
          return (
            <button
              className={styles.page_btn + " page_" + number}
              onClick={changePageHandler}
              type="button"
              value={number}
            >
              {number}
            </button>
          );
        })}
      </div>
    </Fragment>
  );
};

export default RecipesPage;
