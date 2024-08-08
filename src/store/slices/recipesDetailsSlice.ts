import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHttp } from "../../dataFromServer/httpRequest";
import { Tags } from "../../interfacesAndTypesTs/recipesInterfaces";

//Async load types
export const getTagsData = createAsyncThunk<
  Tags,
  undefined,
  { rejectValue: string }
>("recipesDetails/getTagsData", async (_, { rejectWithValue }) => {
  try {
    let tagsData = await getHttp(
      `https://recipes-7e232-default-rtdb.firebaseio.com/tags.json`
    );

    if (tagsData === null) {
      tagsData = [];
    }

    return tagsData;
  } catch {
    return rejectWithValue(
      "Ошибка згрузки рецепта. Попробуйте обновить страницу."
    );
  }
});

type IInitialStates = {
  tags: {
    status: null | string;
    tags: null | Tags;
  };
};
const initialState: IInitialStates = {
  tags: {
    status: null,
    tags: null,
  },
};

const recipesDetailsSlice = createSlice({
  name: "recipesDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTagsData.pending, (state) => {
        state.tags.status = "loading";
      })
      .addCase(getTagsData.fulfilled, (state, action) => {
        state.tags.status = "fulfilled";
        state.tags.tags = action.payload;
      })
      .addCase(getTagsData.rejected, (state) => {
        state.tags.status = "failed";
      });
  },
});

export const recipesDetailsSliceActions = recipesDetailsSlice.actions;

export default recipesDetailsSlice.reducer;
