import React from "react";
import { IRecipesData } from "../../interfacesAndTypesTs/recipesInterfaces";
import { Link } from "react-router-dom";
import styles from "../../pages/RecipesPage.module.css";
import NoImg from "../NoImg";

interface IRecipeCardProps {
  recipe: IRecipesData;
}
const onlyFirstLatterToUpperCase = (string: string): string => {
  return string[0].toUpperCase() + string.toLowerCase().slice(1, string.length);
};

const RecipeCard: React.FC<IRecipeCardProps> = (props) => {
  const recipe = props.recipe;
  //ingredientsList
  const ingredients = recipe.ingredients.map((el) => {
    return Object.keys(el)[0];
  });
  const ingredientsList = onlyFirstLatterToUpperCase(ingredients.join(", "));

  //tags type
  const tagsTypeList = onlyFirstLatterToUpperCase(recipe.tags.type.join(", "));
  //tags diet
  const isExistDietTags: boolean = typeof recipe.tags.diet !== "undefined";
  let tagsDietList: string = "";
  if (typeof recipe.tags.diet !== "undefined" && recipe.tags.diet.length > 0) {
    tagsDietList = onlyFirstLatterToUpperCase(recipe.tags.diet.join(", "));
  }

  return (
    <div className={styles.recipe_card}>
      <Link to={`/recipe/${recipe.id}`}>
        <h3>{recipe.title}</h3>
      </Link>
      <div className={styles.description_container}>
        {!recipe.imgUrl && <NoImg />}
        {recipe.imgUrl && <img src={recipe.imgUrl} alt={recipe.title}></img>}
        <p>{recipe.description}</p>
      </div>
      <p className={styles.ingredients_list}>Ингредиенты: {ingredientsList}</p>
      <p className={styles.tags_type_list}>Тип блюда: {tagsTypeList}</p>
      {isExistDietTags && (
        <p className={styles.tags_diet_list}>Тэги диеты: {tagsDietList}</p>
      )}
    </div>
  );
};

export default RecipeCard;
