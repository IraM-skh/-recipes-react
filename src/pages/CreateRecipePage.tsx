import Ingredient from "../components/createRecipe/Ingredient";
import RecipeStep from "../components/createRecipe/RecipeStep";
import { useAppDispatch, useAppSelector } from "../hooks";
import { newRecipeSliceActions } from "../store/slices/newRecipeSlice";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import TagTypes from "../components/createRecipe/TagTypes";
import ImagePreloader from "../components/createRecipe/ImagePreloader";
import {
  RecipeStepType,
  SpesificRecipe,
} from "../interfacesAndTypesTs/recipesInterfaces";
import { useEffect } from "react";
import { getTagsData } from "../store/slices/recipesDetailsSlice";
import styles from "./CreateRecipePage.module.css";

export type DataForDeleteHandler = {
  id: string;
  action:
    | ActionCreatorWithPayload<string, "recipesList/removeStep">
    | ActionCreatorWithPayload<string, "recipesList/removeIngredientField">;
};

const CreateRecipePage: React.FC = () => {
  useEffect(() => {
    dispatch(getTagsData());
  }, []);
  //-----types
  type CrateRecipeActions =
    | ActionCreatorWithoutPayload<"recipesList/addIngredientField">
    | ActionCreatorWithoutPayload<"recipesList/addTagTypeField">
    | ActionCreatorWithoutPayload<"recipesList/addStep">;

  type FormInputAndSelectFiedls = {
    recipeTitle: HTMLInputElement;
    tagTypes: HTMLInputElement[];
    ingredient: RadioNodeList | HTMLInputElement;
    ingredient_quantity: RadioNodeList | HTMLInputElement;
    ingredient_measurement: RadioNodeList | HTMLSelectElement;
  };
  type FormStepFiedls = {
    [key: string]: HTMLInputElement;
  };

  type FormFiedls = FormInputAndSelectFiedls & FormStepFiedls;

  //-----get states and dispatch
  const dispatch = useAppDispatch();
  const { recipeSteps, mainImgSrs, IngredientFieldsId } = useAppSelector(
    (state) => state.newRecipe
  );
  const { tags } = useAppSelector((state) => state.recipesDetails);
  const tagTypes = tags.tags?.type;
  //-----work with element and node list
  const getValueOfElementOrNodeList = (
    element: RadioNodeList | HTMLInputElement | HTMLSelectElement
  ) => {
    if (element instanceof RadioNodeList) {
      return Array.from(
        element,
        (el) => (el as HTMLInputElement | HTMLSelectElement).value
      );
    }
    return element.value;
  };

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

    //---steps
    const steps = recipeSteps.map((step): RecipeStepType => {
      return {
        imgSrc: step.imgSrc,
        id: step.id,
        stepText: form[step.id].value,
      };
    });
    //---ingredients
    const ingredients = getValueOfElementOrNodeList(form.ingredient);
    const ingredientQuantities = getValueOfElementOrNodeList(
      form.ingredient_quantity
    );
    const ingredientMeasurements = getValueOfElementOrNodeList(
      form.ingredient_measurement
    );
    //---data
    const dataFromUser: SpesificRecipe = {
      title: form.recipeTitle.value,
      tags: {
        type: [...form.tagTypes]
          .filter((el) => el.checked)
          .map((el) => el.value),
      },
      ingredients: {},
      steps,
      mainImgSrs,
    };

    for (let index = 0; index < ingredients.length; index++) {
      dataFromUser.ingredients[ingredients[index]] = [
        ingredientQuantities[index],
        ingredientMeasurements[index],
      ];
    }

    //-------ДОБАВИТЬ ОТПРАВКУ НА СЕРВЕР
    console.log(dataFromUser);
  };

  const deleteFieldHandler = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: DataForDeleteHandler
  ) => {
    dispatch(data.action(data.id));
  };

  //-----JSX
  return (
    <section className={styles.create_recipe}>
      <form onSubmit={createNewRecipeHandler}>
        <h3>Название рецепта</h3>
        <input
          placeholder="Название рецепта"
          type="text"
          name="recipeTitle"
        ></input>
        <h3>Главное фото и описание рецепта</h3>
        <div className={styles.description_container}>
          <ImagePreloader
            id={mainImgSrs.id}
            action={newRecipeSliceActions.setMainImgSrs}
            imgSrc={mainImgSrs.imgSrc}
            inputName="prev_main_picture_input"
          />

          <input type="text"></input>
        </div>
        <h3>Ингредиенты</h3>
        <div className="ingredients_container">
          {IngredientFieldsId.map((id, index) => (
            <Ingredient
              key={id}
              id={id}
              deleteIngredientFieldHandler={deleteFieldHandler}
            />
          ))}

          <button
            className={styles.add_item_in_recipe + " add_ingredient"}
            onClick={(_) =>
              addFieldHandler(_, newRecipeSliceActions.addIngredientField)
            }
            type="button"
          >
            Добавить ингредиент
          </button>
        </div>
        <h3>Шаги рецепта</h3>
        <div className={styles.recipe_steps_container}>
          {recipeSteps.map((step) => (
            <RecipeStep
              key={step.id}
              id={step.id}
              imgSrc={step.imgSrc}
              deleteStepHandler={deleteFieldHandler}
            />
          ))}

          <button
            className={styles.add_item_in_recipe + " add_step"}
            onClick={(_) => addFieldHandler(_, newRecipeSliceActions.addStep)}
            type="button"
          >
            Добавить шаг
          </button>
        </div>
        <h3>Тэги рецепта</h3>
        <div className="tags_container">
          <div className={styles.tag_types_container}>
            {tagTypes &&
              tagTypes.map((tag: string, index: number) => (
                <TagTypes key={"TagTypes" + index} value={tag} />
              ))}
          </div>
        </div>
        <button type="submit">Добавить рецепт</button>
      </form>
    </section>
  );
};

export default CreateRecipePage;
