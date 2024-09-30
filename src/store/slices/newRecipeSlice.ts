import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { postHttp } from "../../dataFromServer/httpRequest";
import {
  SpesificRecipe,
  SpesificRecipeForSending,
} from "../../interfacesAndTypesTs/recipesInterfaces";
import { nameFolderOnServer } from "../../App";

const generateId = (
  array: ImageSrc[] | string[],
  nameOfArray: string
): string => {
  const id = nameOfArray + Math.random().toString() + Math.random().toString();
  let dubledId = undefined;
  if (typeof array[0] === "string") {
    dubledId = (array as string[]).find((el) => el === id);
  } else {
    dubledId = (array as ImageSrc[]).find((el) => el.id === id);
  }

  if (dubledId !== undefined) {
    generateId(array, nameOfArray);
  }
  return id;
};

//types
export type ImageSrc = {
  imgSrc: string;
  id: string;
};

export type NewRecipeSlice = {
  recipeSteps: ImageSrc[];
  mainImgSrs: ImageSrc;
  IngredientFieldsId: string[];
  message: string | null;
  imgFile: any;
  sendNewRecipeResult: sendingNewRecipeResult;
  sendNewRecipeResultError: string;
  sendPhotoResultError: string;
};

export type sendingNewRecipeResult = {
  result: boolean | null;
  id?: string | null;
};

//initialState
const initialState: NewRecipeSlice = {
  recipeSteps: [
    {
      imgSrc: "",
      id: "recipeSteps" + Math.random().toString() + Math.random().toString(),
    },
  ],
  IngredientFieldsId: [
    "ingredientId" + Math.random().toString() + Math.random().toString(),
  ],
  message: null,
  imgFile: "",
  mainImgSrs: { id: "mainImg", imgSrc: "" },
  sendNewRecipeResult: {
    result: null,
    id: null,
  },
  sendNewRecipeResultError: "",
  sendPhotoResultError: "",
};

//asyncthunks
export const sendNewRecipeData = createAsyncThunk<
  sendingNewRecipeResult, //то, что возвращаем, что приходит с фетча
  SpesificRecipeForSending, //то что передаем в async
  { rejectValue: string } //что возвращаем в случае ошибки
>("newRecipe/sendNewRecipeData", async (data, { rejectWithValue }) => {
  try {
    let newRecipeResult = await postHttp(
      `../${nameFolderOnServer}/php/setNewRecipe.php`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    return newRecipeResult;
  } catch {
    return rejectWithValue(
      "Ошибка отправки рецепта. Попробуйте еще раз или обновите страницу."
    );
  }
});

export const sendNewRecipePhoto = createAsyncThunk<
  boolean, //то, что возвращаем, что приходит с фетча
  FormData, //то что передаем в async
  { rejectValue: string } //что возвращаем в случае ошибки
>("newRecipe/sendNewRecipePhoto", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`../${nameFolderOnServer}/php/setPhoto.php`, {
      method: "POST",
      body: data,
    });
    const result: boolean[] = await response.json();

    return result.reduce((acc, result) => {
      if (!acc) {
        return acc;
      }
      return result;
    }, true);
  } catch {
    return rejectWithValue(
      "Ошибка отправки фото. Попробуйте еще раз или обновите страницу."
    );
  }
});

const newRecipeSlice = createSlice({
  name: "newRecipe",
  initialState,
  reducers: {
    addStep(state) {
      state.recipeSteps.push({
        imgSrc: "",
        id: generateId(state.recipeSteps, "recipeSteps"),
      });
    },
    removeStep(state, action: PayloadAction<string>) {
      state.recipeSteps = state.recipeSteps.filter(
        (step) => step.id !== action.payload
      );
    },
    addIngredientField(state) {
      state.IngredientFieldsId.push(
        generateId(state.IngredientFieldsId, "ingredientId")
      );
    },
    removeIngredientField(state, action: PayloadAction<string>) {
      state.IngredientFieldsId = state.IngredientFieldsId.filter(
        (idField) => idField !== action.payload
      );
    },

    setStepSrc(state, action: PayloadAction<ImageSrc>) {
      const step = state.recipeSteps.find(
        (step) => step.id === action.payload.id
      );
      if (step !== undefined) {
        step.imgSrc = action.payload.imgSrc;
      }
    },
    setMainImgSrs(state, action: PayloadAction<ImageSrc>) {
      state.mainImgSrs.imgSrc = action.payload.imgSrc;
    },
    setImage(state, action) {
      state.imgFile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(sendNewRecipeData.fulfilled, (state, action) => {
        state.sendNewRecipeResult.result = action.payload.result;
        if (action.payload.result === true) {
          state.sendNewRecipeResult.id = action.payload.id;
        }
      })
      .addCase(
        sendNewRecipeData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          if (typeof action.payload === "string") {
            state.sendNewRecipeResultError = action.payload;
          }
        }
      )
      .addCase(sendNewRecipePhoto.fulfilled, (state, action) => {
        state.sendNewRecipeResult.result = action.payload;
        if (action.payload === true) {
          state.sendPhotoResultError = "";
        } else {
          state.sendPhotoResultError = "Не удалось загрузить фото.";
        }
      })
      .addCase(
        sendNewRecipePhoto.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          if (typeof action.payload === "string") {
            state.sendPhotoResultError = action.payload;
          }
        }
      );
  },
});

export const newRecipeSliceActions = newRecipeSlice.actions;
export default newRecipeSlice.reducer;
