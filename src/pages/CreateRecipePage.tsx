import { Fragment } from "react/jsx-runtime";
import Ingredient from "../components/createRecipe/Ingredient";
import RecipeStep from "../components/createRecipe/RecipeStep";
import { useAppDispatch, useAppSelector } from "../hooks";
import { newRecipeSliceActions } from "../store/slices/newRecipeSlice";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import TagTypes from "../components/createRecipe/TagTypes";
const CreateRecipePage: React.FC = () => {
  //-----types
  type CrateRecipeActions =
    | ActionCreatorWithoutPayload<"recipesList/addStepFields">
    | ActionCreatorWithoutPayload<"recipesList/addIngredientField">
    | ActionCreatorWithoutPayload<"recipesList/addTagTypeField">;

  //-----get states and dispatch
  const dispatch = useAppDispatch();
  const numberOfrecipeStepFields = useAppSelector(
    (state) => state.newRecipe.numberOfrecipeStepFields
  );
  const numberOfIngredientFields = useAppSelector(
    (state) => state.newRecipe.numberOfIngredientFields
  );
  const numberOfTagTypeFields = useAppSelector(
    (state) => state.newRecipe.numberOfTagTypeFields
  );

  //-----Handlers
  const addFieldHandler = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    action: CrateRecipeActions
  ): void => {
    dispatch(action());
  };

  //-----Create arrey for elements render
  const returnArreyWhithNull = (numberOfElements: number): null[] =>
    new Array(numberOfElements).fill(null);

  const recipeSteps = returnArreyWhithNull(numberOfrecipeStepFields);
  const ingredients = returnArreyWhithNull(numberOfIngredientFields);
  const tagTypes = returnArreyWhithNull(numberOfTagTypeFields);

  //-----JSX
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
        {ingredients.map((_, index) => (
          <Ingredient key={"IngredientElement" + index} />
        ))}

        <button
          className="add_item_in_recipe add_ingredient"
          onClick={(_) =>
            addFieldHandler(_, newRecipeSliceActions.addIngredientField)
          }
        >
          +
        </button>
      </div>
      <div className="recipe_steps_container">
        {recipeSteps.map((_, index) => (
          <RecipeStep key={"stepElement" + index} />
        ))}
        <button
          className="add_item_in_recipe add_step"
          onClick={(_) =>
            addFieldHandler(_, newRecipeSliceActions.addStepFields)
          }
        >
          +
        </button>
      </div>
      <div className="tags_container">
        {tagTypes.map((_, index) => (
          <TagTypes key={"TagTypes" + index} />
        ))}

        <button
          className="add_item_in_recipe add_step"
          onClick={(_) =>
            addFieldHandler(_, newRecipeSliceActions.addTagTypeField)
          }
        >
          +
        </button>
        <button>Хочу добавить свой тип</button>
        <input type="text"></input>
      </div>
    </Fragment>
  );
};

export default CreateRecipePage;
