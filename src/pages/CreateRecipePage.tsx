import Ingredient from "../components/createRecipe/Ingredient";
import RecipeStep from "../components/createRecipe/RecipeStep";
import { useAppDispatch, useAppSelector } from "../hooks";
import { newRecipeSliceActions } from "../store/slices/newRecipeSlice";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import TagTypes from "../components/createRecipe/TagTypes";
import ImagePreloader from "../components/createRecipe/ImagePreloader";
const CreateRecipePage: React.FC = () => {
  //-----types
  type CrateRecipeActions =
    | ActionCreatorWithoutPayload<"recipesList/addIngredientField">
    | ActionCreatorWithoutPayload<"recipesList/addTagTypeField">
    | ActionCreatorWithoutPayload<"recipesList/addStep">;

  type FormInputAndSelectFiedls = {
    recipeTitle: HTMLInputElement;
    tagTypes: HTMLInputElement[];
  };
  type FormStepFiedls = {
    [key: string]: HTMLInputElement;
  };

  type FormFiedls = FormInputAndSelectFiedls & FormStepFiedls;

  //-----get states and dispatch
  const dispatch = useAppDispatch();
  const { numberOfIngredientFields, recipeSteps, mainImgSrs, tagTypes } =
    useAppSelector((state) => state.newRecipe);

  //-----Create arrey for elements render
  const returnArreyWhithNull = (numberOfElements: number): null[] =>
    new Array(numberOfElements).fill(null);

  const ingredients = returnArreyWhithNull(numberOfIngredientFields);

  //-----Handlers
  const addFieldHandler = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    action: CrateRecipeActions
  ): void => {
    dispatch(action());
  };

  const createNewRecipeHandler: React.FormEventHandler<
    HTMLFormElement & FormFiedls
  > = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const dataFromUser = {
      title: form.recipeTitle.value,
      tagTypes: [...form.tagTypes]
        .filter((el) => el.checked)
        .map((el) => el.value),
    };
    console.log(dataFromUser.title);
    console.log(dataFromUser.tagTypes);
  };

  const deleteStepHandler = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    dispatch(newRecipeSliceActions.removeStep(id));
  };
  //-----JSX
  return (
    <form onSubmit={createNewRecipeHandler}>
      <input
        placeholder="Название рецепта"
        type="text"
        name="recipeTitle"
      ></input>
      <div>
        <label htmlFor="prev_main_picture_input">
          Загрузите изображение рецепта
        </label>
        <ImagePreloader
          id={mainImgSrs.id}
          action={newRecipeSliceActions.setMainImgSrs}
          imgSrc={mainImgSrs.imgSrc}
          inputName="prev_main_picture_input"
        />
      </div>

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
        {recipeSteps.map((step) => (
          <RecipeStep
            key={step.id}
            id={step.id}
            imgSrc={step.imgSrc}
            deleteStepHandler={deleteStepHandler}
          />
        ))}
        <button
          className="add_item_in_recipe add_step"
          onClick={(_) => addFieldHandler(_, newRecipeSliceActions.addStep)}
        >
          +
        </button>
      </div>
      <div className="tags_container">
        {tagTypes.map((tag, index) => (
          <TagTypes key={"TagTypes" + index} value={tag} />
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
      <button type="submit">Отправть форму</button>
    </form>
  );
};

export default CreateRecipePage;
