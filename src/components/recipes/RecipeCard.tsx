import React from "react";
import { IRecipesData } from "../../interfacesAndTypesTs/recipesInterfaces";
import { Link } from "react-router-dom";
interface IRecipeCardProps {
  recipe: IRecipesData;
}
const onlyFirstLatterToUpperCase = (string: string): string => {
  return string[0].toUpperCase() + string.toLowerCase().slice(1, string.length);
};

const RecipeCard: React.FC<IRecipeCardProps> = (props) => {
  const recipe = props.recipe;
  //ingridientsList
  const ingridients = Object.keys(recipe.ingridients);
  const ingridientsList = onlyFirstLatterToUpperCase(ingridients.join(", "));

  //tags type
  const tagsTypeList = onlyFirstLatterToUpperCase(recipe.tags.type.join(", "));
  //tags diet
  const isExistDietTags: boolean = typeof recipe.tags.diet !== "undefined";
  let tagsDietList: string = "";
  if (typeof recipe.tags.diet !== "undefined") {
    tagsDietList = onlyFirstLatterToUpperCase(recipe.tags.diet.join(", "));
  }

  return (
    <div className="recipe_card">
      <Link to={`/recipe/${recipe.id}`}>
        <h3>{recipe.title}</h3>
      </Link>

      <img src={recipe.imgUrl} alt={recipe.title}></img>
      <p className="ingridients_list">{ingridientsList}</p>
      <p className="tags_type_list">Тип блюда: {tagsTypeList}</p>
      {isExistDietTags && (
        <p className="tags_diet_list">Тэги диеты: {tagsDietList}</p>
      )}
    </div>
  );
};

export default RecipeCard;
