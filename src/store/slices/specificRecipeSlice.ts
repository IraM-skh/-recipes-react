import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "./fetchStatusSlice";
import { getHttp } from "../../dataFromServer/httpRequest";
import { PayloadAction } from "@reduxjs/toolkit";
import { IRecipesData } from "../../interfacesAndTypesTs/recipesInterfaces";
import { Comments } from "../../interfacesAndTypesTs/comments";

//AsyncThunk load recipe
export const getRecipeData = createAsyncThunk<
  IRecipesData,
  string,
  { rejectValue: string }
>("specificRecipe/getRecipeData", async (srcRecipesId, { rejectWithValue }) => {
  try {
    let recipesData = await getHttp(
      `https://recipes-7e232-default-rtdb.firebaseio.com/Recipes/${srcRecipesId}.json`
    );
    if (recipesData === null) {
      recipesData = [];
    }

    return recipesData;
  } catch {
    return rejectWithValue(
      "Ошибка згрузки рецепта. Попробуйте обновить страницу."
    );
  }
});

export const getRecipeCooments = createAsyncThunk<
  Comments,
  undefined,
  { rejectValue: string }
>("specificRecipe/getRecipeCooments", async (_, { rejectWithValue }) => {
  try {
    let commentsData = await getHttp(
      `https://recipes-7e232-default-rtdb.firebaseio.com/Comments.json`
    );
    if (commentsData === null) {
      commentsData = [];
    }

    return commentsData;
  } catch {
    return rejectWithValue(
      "Ошибка згрузки рецепта. Попробуйте обновить страницу."
    );
  }
});

//initialStates
interface IInitialStates extends FetchStatus {
  recipe: IRecipesData | null;
  comments: Comments | [];
}
const initialState: IInitialStates = {
  recipe: null,
  status: null,
  message: null,
  comments: [],
};

const specificRecipeSlice = createSlice({
  name: "specificRecipe",
  initialState,
  reducers: {
    // update(state, action: PayloadAction<Recipes>) {
    //   state.recipes = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(getRecipeData.pending, (state) => {
        state.status = "loading";
        state.message = "Загрузка рецептов";
      })
      // Вызывается, если запрос успешно выполнился
      .addCase(getRecipeData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.message = "Данные получены";
        state.recipe = action.payload;
      })
      .addCase(
        getRecipeData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          if (typeof action.payload === "string") {
            state.status = "failed";
            state.message = action.payload;
            state.recipe = null;
          }
        }
      )
      .addCase(getRecipeCooments.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});
export const specificRecipeSliceActions = specificRecipeSlice.actions;

export default specificRecipeSlice.reducer;
