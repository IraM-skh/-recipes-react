import Ingredient from "../components/createRecipe/Ingredient";
import RecipeStep from "../components/createRecipe/RecipeStep";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  newRecipeSliceActions,
  sendNewRecipeData,
  sendNewRecipePhoto,
} from "../store/slices/newRecipeSlice";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import ImagePreloader from "../components/createRecipe/ImagePreloader";
import {
  SpesificRecipeForSending,
  StepsForSending,
} from "../interfacesAndTypesTs/recipesInterfaces";
import { useEffect, useRef, useState } from "react";
import {
  getMeasurementsData,
  getTagsData,
} from "../store/slices/recipesDetailsSlice";
import styles from "./CreateRecipePage.module.css";
import Tags from "../components/createRecipe/Tags";
import { postHttp } from "../dataFromServer/httpRequest";
import { nameFolderOnServer } from "../App";
import { getIsUserLoggedIn } from "../store/slices/loginDataSlice";

export type DataForDeleteHandler = {
  id: string;
  action:
    | ActionCreatorWithPayload<string, "newRecipe/removeStep">
    | ActionCreatorWithPayload<string, "newRecipe/removeIngredientField">;
};

const CreateRecipePage: React.FC = () => {
  //-----loading recipe details for constructor
  useEffect(() => {
    dispatch(getTagsData());
    dispatch(getMeasurementsData());
  }, []);
  //-----types
  type CrateRecipeActions =
    | ActionCreatorWithoutPayload<"newRecipe/addIngredientField">
    | ActionCreatorWithoutPayload<"newRecipe/addTagTypeField">
    | ActionCreatorWithoutPayload<"newRecipe/addStep">;
  type FormInputAndSelectFiedls = {
    recipeTitle: HTMLInputElement;
    tagTypes: HTMLInputElement[];
    ingredient: RadioNodeList | HTMLInputElement;
    ingredient_quantity: RadioNodeList | HTMLInputElement;
    ingredient_measurement: RadioNodeList | HTMLSelectElement;
    description: HTMLInputElement;
    TagTypes: NodeListOf<HTMLInputElement>;
    TagDiet: NodeListOf<HTMLInputElement>;
  };
  type FormStepFiedls = {
    [key: string]: HTMLInputElement;
  };
  type FormFiedls = FormInputAndSelectFiedls & FormStepFiedls;
  type ValidateMessage = {
    tagsError: string;
    stepsError: string;
    ingredientsError: string;
    titleError: string;
  };
  //-----get states and dispatch
  const dispatch = useAppDispatch();
  const {
    recipeSteps,
    mainImgSrs,
    IngredientFieldsId,
    sendNewRecipeResult,
    sendNewPhotoResult,
    sendPhotoResultError,
    sendNewRecipeResultError,
  } = useAppSelector((state) => state.newRecipe);
  const { tags, measurements } = useAppSelector(
    (state) => state.recipesDetails
  );
  const isUserLoggedIn = useAppSelector((state) => state.userData.isLogin);
  const tagTypes = tags.tags?.type;
  const tagDiet = tags.tags?.diet;
  const [validateMessage, setValidateMessage] = useState<ValidateMessage>({
    tagsError: "",
    stepsError: "",
    ingredientsError: "",
    titleError: "",
  });
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

  //-----sending photo after sucsess load recipe
  const formTest: React.MutableRefObject<HTMLFormElement | null> = useRef(null);

  useEffect(() => {
    dispatch(getIsUserLoggedIn());
  }, []);

  useEffect(() => {
    if (
      formTest.current !== null &&
      sendNewRecipeResult.id &&
      sendNewRecipeResult.result
    ) {
      const formData = new FormData(formTest.current);
      formData.append("id", sendNewRecipeResult.id);
      dispatch(sendNewRecipePhoto(formData));
    }
  }, [sendNewRecipeResult.id]);

  useEffect(() => {
    //-----clear form after sucsess load recipe photo
    if (sendNewPhotoResult) {
      const timerResetForm = setTimeout(() => {
        dispatch(newRecipeSliceActions.clearStateFormFields());
        clearTimeout(timerResetForm);
      }, 5000);
    }
    //-----delete uploaded recipe if uploading photo caused error
    if (
      !sendNewPhotoResult !== null &&
      !sendNewPhotoResult &&
      sendNewRecipeResult.result &&
      sendNewRecipeResult.id
    ) {
      postHttp(`../${nameFolderOnServer}/php/deleteNewRecipe.php`, {
        method: "POST",
        body: JSON.stringify(sendNewRecipeResult.id),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
    }
  }, [sendNewPhotoResult]);

  const clearValidateMessage = () => {
    setValidateMessage(() => {
      return {
        tagsError: "",
        stepsError: "",
        ingredientsError: "",
        titleError: "",
      };
    });
  };

  let formErrors = {
    tagsError: "",
    stepsError: "",
    ingredientsError: "",
    titleError: "",
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
    clearValidateMessage();
    formErrors = {
      tagsError: "",
      stepsError: "",
      ingredientsError: "",
      titleError: "",
    };
    //checked tags and diet
    const checkedTypes = [...form.TagTypes].filter(
      (el: HTMLInputElement) => el.checked
    );
    const checkedDiets = [...form.TagDiet].filter(
      (el: HTMLInputElement) => el.checked
    );
    //validate empty tags
    if (checkedTypes.length === 0 || checkedDiets.length === 0) {
      formErrors.tagsError = "Выберите теги рецета.";
    }
    //-steps
    const steps = recipeSteps.map((step): StepsForSending => {
      return {
        id: step.id,
        stepText: form[step.id].value,
      };
    });
    //validate empty steps
    if (steps.length < 2) {
      formErrors.stepsError = "Заполните хотябы 2 шага рецепта.";
    }
    if (steps.filter((step) => step.stepText === "").length > 0) {
      formErrors.stepsError = "Заполните описание всех шагов.";
    }
    //-ingredients
    const ingredientsAtInput = getValueOfElementOrNodeList(form.ingredient);
    const ingredientQuantities = getValueOfElementOrNodeList(
      form.ingredient_quantity
    );
    const ingredientMeasurements = getValueOfElementOrNodeList(
      form.ingredient_measurement
    );
    const ingredients = [];
    if (
      typeof ingredientsAtInput === "string" &&
      typeof ingredientQuantities === "string" &&
      typeof ingredientMeasurements === "string"
    ) {
      if (ingredientMeasurements === "по вкусу") {
        ingredients.push({
          ingredient: ingredientsAtInput,
          ingredientQuantitie: "",
          ingredientMeasurement: ingredientMeasurements,
        });
      } else {
        ingredients.push({
          ingredient: ingredientsAtInput,
          ingredientQuantitie: ingredientQuantities,
          ingredientMeasurement: ingredientMeasurements,
        });
      }
    }
    if (
      typeof ingredientsAtInput !== "string" &&
      typeof ingredientQuantities !== "string" &&
      typeof ingredientMeasurements !== "string"
    ) {
      ingredientsAtInput.forEach((ingredient, index) => {
        if (ingredientMeasurements[index] === "по вкусу") {
          ingredients.push({
            ingredient,
            ingredientQuantitie: "",
            ingredientMeasurement: ingredientMeasurements[index],
          });
        } else {
          ingredients.push({
            ingredient,
            ingredientQuantitie: ingredientQuantities[index],
            ingredientMeasurement: ingredientMeasurements[index],
          });
        }
      });
    }
    //validate ingredients steps
    if (
      ingredients.filter((ingredient) => ingredient.ingredient === "").length >
      0
    ) {
      formErrors.ingredientsError = "Заполните поля с ингредиентами";
    }
    if (form.recipeTitle.value === "") {
      formErrors.titleError = "Заполните название рецепта";
    }
    //validate
    const test = Object.values(formErrors).filter((message) => {
      return message !== "";
    });
    setValidateMessage(() => formErrors);

    if (test.length > 0) {
      return;
    }

    //-fore data
    const dataFromUser: SpesificRecipeForSending = {
      title: form.recipeTitle.value,
      tags: {
        type: checkedTypes.map((el) => el.value),
        diet: checkedDiets.map((el) => el.value),
      },
      ingredients,
      steps,
      description: form.description.value,
    };
    //-sending data
    dispatch(sendNewRecipeData(dataFromUser));
  };

  const deleteFieldHandler = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: DataForDeleteHandler
  ) => {
    dispatch(data.action(data.id));
  };
  const errors = Object.values(validateMessage).filter((message) => {
    return message !== "";
  });
  //-----JSX
  return (
    <section className={styles.create_recipe}>
      {tags.errorMessage && !measurements.errorMessage && (
        <p className="error">{tags.errorMessage}</p>
      )}
      {!isUserLoggedIn && (
        <p className="error">Войдите в профиль, чтобы добавить рецепт.</p>
      )}
      {measurements.errorMessage && !tags.errorMessage && (
        <p className="error">{measurements.errorMessage}</p>
      )}
      {tags.errorMessage && measurements.errorMessage && (
        <p className="error">
          Ошибка загрузки данных. Попробуйте обновить страницу.
        </p>
      )}
      {sendNewPhotoResult && (
        <p className={styles.success_message}>Рецепт отправлен!</p>
      )}
      {!(tags.errorMessage || measurements.errorMessage) &&
        !sendNewPhotoResult &&
        isUserLoggedIn && (
          <form
            onSubmit={createNewRecipeHandler}
            ref={formTest}
            className={styles.new_recipe_form}
          >
            <h3>Название рецепта</h3>
            <input
              placeholder="Название рецепта"
              type="text"
              name="recipeTitle"
              className={styles.recipe_title}
            ></input>
            <h3>Главное фото и описание рецепта</h3>
            <div className={styles.description_container}>
              <ImagePreloader
                id={mainImgSrs.id}
                action={newRecipeSliceActions.setMainImgSrs}
                imgSrc={mainImgSrs.imgSrc}
                inputName="prev_main_picture_input"
              />

              <textarea name="description"></textarea>
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
                onClick={(_) =>
                  addFieldHandler(_, newRecipeSliceActions.addStep)
                }
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
                    <Tags
                      key={"TagTypes" + index}
                      value={tag}
                      inputName="TagTypes"
                    />
                  ))}
              </div>
              <div className={styles.tag_diet_container}>
                {tagDiet &&
                  tagDiet.map((tag: string, index: number) => (
                    <Tags
                      key={"TagDiet" + index}
                      value={tag}
                      inputName="TagDiet"
                    />
                  ))}
              </div>
            </div>
            {sendNewRecipeResultError !== "" && (
              <p className="error">{sendNewRecipeResultError}</p>
            )}
            {sendPhotoResultError !== "" && (
              <p className="error">{sendPhotoResultError}</p>
            )}
            {errors.length > 0 &&
              errors.map((error) => <p className="error">{error}</p>)}
            <button type="submit">Добавить рецепт</button>
          </form>
        )}
    </section>
  );
};

export default CreateRecipePage;
