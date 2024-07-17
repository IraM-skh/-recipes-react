import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchStatusSliceActions } from "./fetchStatus";
import { getHttp } from "../../dataFromServer/httpRequest";
import { useDispatch } from "react-redux";

export const getRecipesData1 = createAsyncThunk(
  "recipesList/getRecipesData1",
  async () => {
    let recipesData = await getHttp(
      "https://recipes-7e232-default-rtdb.firebaseio.com/Recipes.json"
    );
    if (recipesData === null) {
      recipesData = [];
    }
    return recipesData;
  }
);

const recipesListSlice = createSlice({
  name: "recipesList",
  initialState: {
    recipes: [],
    fetchStatus: "",
    fetchError: "",
  },
  reducers: {
    update(state: any, action) {
      state.recipes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(getRecipesData1.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
      // Вызывается, если запрос успешно выполнился
      .addCase(getRecipesData1.fulfilled, (state, action) => {
        // Добавляем пользователя
        //usersAdapter.addOne(state, action);
        state.recipes = action.payload;
        state.fetchStatus = "sucsess";
        state.fetchError = "";
      })
      // Вызывается в случае ошибки
      .addCase(getRecipesData1.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = "Ошибка";
      });
  },
});
export const recipesListSliceActions = recipesListSlice.actions; //экспорт в компоненты
export const getRecipesData = () => {
  return async (dispatchFun: any) => {
    try {
      let recipesData = await getHttp(
        "https://recipes-7e232-default-rtdb.firebaseio.com/Recipes.json"
      );
      if (recipesData === null) {
        recipesData = [];
      }
      dispatchFun(recipesListSliceActions.update(recipesData));
    } catch (error) {
      dispatchFun(
        fetchStatusSliceActions.showStatusMessage({
          status: "error",
          title: "Ошибка запроса",
          message: "Ошибка при отправке данных заказа.",
        })
      );
    }
  };
};

export default recipesListSlice.reducer; //экспорт в стор
