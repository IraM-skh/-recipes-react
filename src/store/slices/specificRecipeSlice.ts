import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "./fetchStatusSlice";
import { getHttp } from "../../dataFromServer/httpRequest";
import { PayloadAction } from "@reduxjs/toolkit";
import { IRecipesData } from "../../interfacesAndTypesTs/recipesInterfaces";
import { Comment, Comments } from "../../interfacesAndTypesTs/comments";

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
  string,
  { rejectValue: string }
>("specificRecipe/getRecipeCooments", async (idRecipe, { rejectWithValue }) => {
  try {
    let commentsData = await getHttp(
      `https://recipes-7e232-default-rtdb.firebaseio.com/Comments/${idRecipe}.json`
    );
    if (commentsData === null) {
      commentsData = [];
    }

    commentsData = Object.values(commentsData);
    console.log(commentsData, "загрузка данных о комментах");
    return commentsData;
  } catch {
    return rejectWithValue(
      "Ошибка згрузки рецепта. Попробуйте обновить страницу."
    );
  }
});

export const sendRecipeCooment = createAsyncThunk<
  string,
  Comment,
  { rejectValue: string }
>(
  "specificRecipe/sendRecipeCooment",
  async (commentData, { rejectWithValue }) => {
    try {
      await fetch(
        `https://recipes-7e232-default-rtdb.firebaseio.com/Comments/${commentData.idRecipe}.json`,
        {
          method: "POST",
          body: JSON.stringify(commentData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return commentData.idRecipe;
    } catch {
      return rejectWithValue(
        "Ошибка отправки комментария. Попробуйте обновить страницу."
      );
    }
  }
);

//initialStates
interface IInitialStates extends FetchStatus {
  recipe: IRecipesData | null;
  comments: Comments | [];
  addNewCommentStatus: boolean;
}
const initialState: IInitialStates = {
  recipe: null,
  status: null,
  message: null,
  comments: [],
  addNewCommentStatus: false,
};

const specificRecipeSlice = createSlice({
  name: "specificRecipe",
  initialState,
  reducers: {
    resetNewCommentStatus(state) {
      state.addNewCommentStatus = false;
    },
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
      })
      .addCase(sendRecipeCooment.fulfilled, (state, action) => {
        state.addNewCommentStatus = true;
      });
  },
});
export const specificRecipeSliceActions = specificRecipeSlice.actions;

export default specificRecipeSlice.reducer;
