import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "./fetchStatusSlice";
import { getHttp, postHttp } from "../../dataFromServer/httpRequest";
import { Recipes } from "../../interfacesAndTypesTs/recipesInterfaces";
import { PayloadAction } from "@reduxjs/toolkit";
import { nameFolderOnServer } from "../../App";

//AsyncThunk
export const getRecipesData = createAsyncThunk<
  Recipes,
  undefined,
  { rejectValue: string }
>("recipesList/getRecipesData", async (_, { rejectWithValue }) => {
  try {
    let recipesData = await getHttp(
      `../${nameFolderOnServer}/php/getRecipesList.php`
    );
    if (recipesData === null) {
      recipesData = [];
    }

    return recipesData;
  } catch {
    return rejectWithValue(
      "Ошибка згрузки рецептов. Попробуйте обновить страницу."
    );
  }
});

//initialStates
const initialStateRecipes: Recipes = [];
const initialStateStatus: FetchStatus = {
  status: null,
  message: null,
};

const recipesListSlice = createSlice({
  name: "recipesList",
  initialState: {
    recipes: initialStateRecipes,
    status: initialStateStatus.status,
    message: initialStateStatus.message,
  },
  reducers: {
    update(state, action: PayloadAction<Recipes>) {
      state.recipes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipesData.pending, (state) => {
        state.status = "loading";
        state.message = "Загрузка рецептов";
      })
      .addCase(getRecipesData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.message = "Данные получены";
        state.recipes = action.payload;
      });
    builder.addCase(
      getRecipesData.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        if (typeof action.payload === "string") {
          state.status = "failed";
          state.message = action.payload;
          state.recipes = [];
        }
      }
    );
  },
});
export const recipesListSliceActions = recipesListSlice.actions;

export default recipesListSlice.reducer;
