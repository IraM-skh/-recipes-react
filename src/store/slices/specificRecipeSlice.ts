import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "./fetchStatusSlice";
import { getHttp, postHttp } from "../../dataFromServer/httpRequest";
import { PayloadAction } from "@reduxjs/toolkit";
import { IRecipesData } from "../../interfacesAndTypesTs/recipesInterfaces";
import { Comment, Comments } from "../../interfacesAndTypesTs/comments";
import { nameFolderOnServer } from "../../App";

//AsyncThunk load recipe
export const getRecipeData = createAsyncThunk<
  IRecipesData,
  string,
  { rejectValue: string }
>("specificRecipe/getRecipeData", async (srcRecipesId, { rejectWithValue }) => {
  try {
    const url = `../${nameFolderOnServer}/php/getOneRecipe.php`;
    let recipesData = await postHttp(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(srcRecipesId),
    });
    if (recipesData === null) {
      recipesData = [];
    }

    return recipesData[0];
  } catch {
    return rejectWithValue(
      "Ошибка згрузки рецепта. Попробуйте обновить страницу."
    );
  }
});

export const getRecipeComments = createAsyncThunk<
  Comments,
  string,
  { rejectValue: string }
>("specificRecipe/getRecipeComments", async (idRecipe, { rejectWithValue }) => {
  try {
    let commentsData = await postHttp(
      `../${nameFolderOnServer}/php/getComments.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(idRecipe),
      }
    );
    if (commentsData === null) {
      commentsData = [];
    }

    commentsData = Object.values(commentsData);
    return commentsData;
  } catch {
    return rejectWithValue(
      "Ошибка згрузки рецепта. Попробуйте обновить страницу."
    );
  }
});

export const sendRecipeComment = createAsyncThunk<
  string,
  Comment,
  { rejectValue: string }
>(
  "specificRecipe/sendRecipeComment",
  async (commentData, { rejectWithValue }) => {
    try {
      await fetch(`../${nameFolderOnServer}/php/setNewComment.php`, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      return commentData.idRecipe;
    } catch {
      return rejectWithValue(
        "Ошибка отправки комментария. Попробуйте еще раз или обновите страницу."
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
      .addCase(getRecipeData.pending, (state) => {
        state.status = "loading";
        state.message = "Загрузка рецептов";
      })
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
      .addCase(getRecipeComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(sendRecipeComment.fulfilled, (state, action) => {
        state.addNewCommentStatus = true;
      });
  },
});
export const specificRecipeSliceActions = specificRecipeSlice.actions;

export default specificRecipeSlice.reducer;
