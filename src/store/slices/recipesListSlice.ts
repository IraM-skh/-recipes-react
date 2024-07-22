import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchStatus, fetchStatusSliceActions } from "./fetchStatusSlice";
import { getHttp } from "../../dataFromServer/httpRequest";
import { Recipes } from "../../interfacesAndTypesTs/recipesInterfaces";
import { PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "..";

//AsyncThunk
export const getRecipesData = createAsyncThunk<
  Recipes,
  undefined,
  { rejectValue: string }
>("recipesList/getRecipesData1", async (_, { rejectWithValue }) => {
  try {
    let recipesData = await getHttp(
      "https://recipes-7e232-default-rtdb.firebaseio.com/Recipes.json"
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
      // Вызывается прямо перед выполнением запроса
      .addCase(getRecipesData.pending, (state) => {
        state.status = "loading";
        state.message = "Загрузка рецептов";
      })
      // Вызывается, если запрос успешно выполнился
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
