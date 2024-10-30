import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHttp } from "../../dataFromServer/httpRequest";
import { Tags } from "../../interfacesAndTypesTs/recipesInterfaces";
import { nameFolderOnServer } from "../../App";
import { PayloadAction } from "@reduxjs/toolkit";

//Async load types
export const getTagsData = createAsyncThunk<
  Tags,
  undefined,
  { rejectValue: string }
>("recipesDetails/getTagsData", async (_, { rejectWithValue }) => {
  try {
    let tagsData = await getHttp(
      `../${nameFolderOnServer}/php/getTagsData.php`
    );

    if (tagsData === null) {
      tagsData = {};
    }

    return tagsData;
  } catch {
    return rejectWithValue(
      "Ошибка згрузки тегов. Попробуйте обновить страницу."
    );
  }
});

export const getMeasurementsData = createAsyncThunk<
  string[],
  undefined,
  { rejectValue: string }
>("recipesDetails/getMeasurementsData", async (_, { rejectWithValue }) => {
  try {
    let measurementsData = await getHttp(
      `../${nameFolderOnServer}/php/getMeasurement.php`
    );

    if (measurementsData === null) {
      measurementsData = [];
    }

    return measurementsData;
  } catch {
    return rejectWithValue(
      "Ошибка згрузки единиц измерения. Попробуйте обновить страницу."
    );
  }
});

type IInitialStates = {
  tags: {
    status: null | string;
    tags: null | Tags;
    errorMessage: string;
  };
  measurements: {
    status: null | string;
    errorMessage: string;
    measurements: string[];
  };
};
const initialState: IInitialStates = {
  tags: {
    status: null,
    tags: null,
    errorMessage: "",
  },
  measurements: {
    status: null,
    errorMessage: "",
    measurements: [],
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
        state.tags.errorMessage = "";
      })
      .addCase(getTagsData.fulfilled, (state, action) => {
        state.tags.status = "fulfilled";
        state.tags.tags = action.payload;
        action.payload.type
          ? (state.tags.errorMessage = "")
          : (state.tags.errorMessage =
              "Ошибка згрузки тегов. Попробуйте обновить страницу.");
      })
      .addCase(
        getTagsData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.tags.status = "failed";
          if (action.payload) {
            state.tags.errorMessage = action.payload;
          }
        }
      )
      .addCase(getMeasurementsData.pending, (state) => {
        state.measurements.status = "loading";
        state.measurements.errorMessage = "";
      })
      .addCase(getMeasurementsData.fulfilled, (state, action) => {
        state.measurements.status = "fulfilled";
        state.measurements.measurements = action.payload;
        action.payload.length > 0
          ? (state.measurements.errorMessage = "")
          : (state.measurements.errorMessage =
              "Ошибка згрузки тегов. Попробуйте обновить страницу.");
      })
      .addCase(
        getMeasurementsData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.measurements.status = "failed";
          if (action.payload) {
            state.measurements.errorMessage = action.payload;
          }
        }
      );
  },
});

export const recipesDetailsSliceActions = recipesDetailsSlice.actions;

export default recipesDetailsSlice.reducer;
