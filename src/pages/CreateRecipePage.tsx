import { Fragment } from "react/jsx-runtime";
import Ingredient from "../components/createRecipe/Ingredient";
import RecipeStep from "../components/createRecipe/RecipeStep";
import { ReactEventHandler, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { newRecipeSliceActions } from "../store/slices/newRecipeSlice";
const CreateRecipePage: React.FC = () => {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(newRecipeSliceActions.addStep(<RecipeStep />));
  // }, []);
  const RecipeStepsArray = useAppSelector(
    (state) => state.newRecipe.recipeStepsArray
  );
  const addStepHandler: ReactEventHandler = () => {
    dispatch(newRecipeSliceActions.addStep());
  };

  return (
    <Fragment>
      <input placeholder="Название рецепта" type="text"></input>
      <p>
        <label htmlFor="prev_main_picture_input">
          Загрузите изображение рецепта
        </label>
        <input
          type="file"
          name="prev_main_picture_input"
          id="prev_main_picture_input"
          multiple
          accept="image/*,image/jpeg"
        />
      </p>
      <div className="ingredients_container">
        <Ingredient />
        <button className="add_item_in_recipe add_ingredient">+</button>
      </div>
      <div className="recipe_steps_container">
        {/* <RecipeStep/> */}
        {RecipeStepsArray}
        <button
          className="add_item_in_recipe add_step"
          onClick={addStepHandler}
        >
          +
        </button>
      </div>
      <div className="tags_container">
        <select>
          <option>салаты</option>
          <option>втроые блюда</option>
        </select>
        <button className="add_item_in_recipe add_step">+</button>
        <button>Хочу добавить свой тип</button>
        <input type="text"></input>
      </div>
    </Fragment>
  );
};

export default CreateRecipePage;
