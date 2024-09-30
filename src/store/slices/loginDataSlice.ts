import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { getHttp, postHttp } from "../../dataFromServer/httpRequest";
import { Comments } from "../../interfacesAndTypesTs/comments";
import { nameFolderOnServer } from "../../App";

export type UserInfo = {
  ownRecipes?: [
    { title: string; imgUrl: string; id: string; description: string }
  ];
  favoriteRecipes?: [
    { title: string; imgUrl: string; id: string; description: string }
  ];
  ownComments?: Comments;
  errorUserInfo?: string;
  statusUserInfo?: string;
};

export type LoginData = {
  login: string;
  password: string;
  remember: boolean;
};

export type RegistrationData = LoginData & {
  eMail: string;
};

export type RegistrationResult = {
  login: string;
  eMail: string;
};

export const getIsUserLoggedIn = createAsyncThunk<
  { isLogin: boolean; login: string },
  undefined,
  { rejectValue: string }
>("userData/getIsUserLoggedIn", async (_, { rejectWithValue }) => {
  try {
    let loginInfo = await getHttp(
      `../${nameFolderOnServer}/php/isUserLogin.php`
    );
    if (loginInfo === null) {
      loginInfo = {
        isLogin: false,
        login: "",
      };
    }

    return loginInfo;
  } catch {
    return rejectWithValue(
      "Ошибка загрузки информации о профиле. Попробуте обновить страницу."
    );
  }
});

export const getUserData = createAsyncThunk<
  UserInfo,
  undefined,
  { rejectValue: string }
>("userData/getUserData", async (_, { rejectWithValue }) => {
  try {
    let userData = await getHttp(
      `../${nameFolderOnServer}/php/getUserData.php`
    );
    if (userData === null) {
      userData = {
        error: "Пользователь не найден попробуйте войти заново",
      };
    }

    return userData;
  } catch {
    return rejectWithValue(
      "Ошибка загрузки информации о профиле. Попробуте обновить страницу."
    );
  }
});

export const sendRegistration = createAsyncThunk<
  RegistrationResult, //то, что возвращаем, что приходит с фетча
  RegistrationData, //то что передаем в async
  { rejectValue: string } //что возвращаем в случае ошибки
>("userData/sendRegistration", async (data, { rejectWithValue }) => {
  try {
    let registrationInfo = await postHttp(
      `../${nameFolderOnServer}/php/setRegistration.php`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    return registrationInfo;
  } catch {
    return rejectWithValue(
      "Ошибка попытки регистрации. Попробуйте почистить кэш и обновить страницу."
    );
  }
});

export const login = createAsyncThunk<
  boolean, //то, что возвращаем, что приходит с фетча
  LoginData, //то что передаем в async
  { rejectValue: string } //что возвращаем в случае ошибки
>("userData/login", async (data, { rejectWithValue }) => {
  try {
    let registrationInfo = await postHttp(
      `../${nameFolderOnServer}/php/login.php`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    return registrationInfo;
  } catch {
    return rejectWithValue(
      "Ошибка входа в профиль. Попробуйте почистить кэш и обновить страницу."
    );
  }
});

type InitialState = {
  isLogin: boolean;
  loginStatus: boolean;
  login: string;
  statusIsLogged: string;
  errorIsLoggedMessage: string;
  errorLogin: string;
  errorRegistrationLogin: string;
  errorRegistrationEMail: string;
  loadingError: string;
} & UserInfo;

const initialState: InitialState = {
  isLogin: false,
  loginStatus: false,
  login: "",
  statusIsLogged: "",
  errorIsLoggedMessage: "",
  ownComments: [],
  errorLogin: "",
  errorRegistrationLogin: "",
  errorRegistrationEMail: "",
  loadingError: "",
};
const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateLoginStatus(state) {
      state.loginStatus = !state.loginStatus;
    },
  },
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(getIsUserLoggedIn.pending, (state) => {
        state.statusIsLogged = "loading";
      })
      // Вызывается, если запрос успешно выполнился
      .addCase(getIsUserLoggedIn.fulfilled, (state, action) => {
        state.statusIsLogged = "fulfilled";
        state.isLogin = action.payload.isLogin;
        state.login = action.payload.login;
      })
      .addCase(
        getIsUserLoggedIn.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          if (typeof action.payload === "string") {
            state.statusIsLogged = "failed";
            state.errorIsLoggedMessage = action.payload;
          }
        }
      )
      .addCase(getUserData.pending, (state) => {
        state.statusUserInfo = "loading";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.statusUserInfo = "fulfilled";

        if (state.errorUserInfo === undefined) {
          state.favoriteRecipes = action.payload.favoriteRecipes;
          state.ownComments = action.payload.ownComments;
          state.ownRecipes = action.payload.ownRecipes;
        } else {
          state.errorUserInfo = action.payload.errorUserInfo;
        }
      })
      .addCase(
        getUserData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          if (typeof action.payload === "string") {
            state.statusUserInfo = "failed";
            if (
              state.favoriteRecipes != undefined ||
              state.ownComments != undefined ||
              state.ownRecipes != undefined
            ) {
              delete state.favoriteRecipes;
              delete state.ownComments;
              delete state.ownRecipes;
            }
            state.errorUserInfo = action.payload;
          }
        }
      )
      .addCase(sendRegistration.fulfilled, (state, action) => {
        state.errorRegistrationEMail = "";
        state.errorRegistrationLogin = "";
        state.loadingError = "";
        if (action.payload.eMail !== "") {
          state.errorRegistrationEMail = action.payload.eMail;
        }
        if (action.payload.login !== "") {
          state.errorRegistrationLogin = action.payload.login;
        }
      })
      .addCase(
        sendRegistration.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          if (typeof action.payload === "string") {
            state.loadingError = state.loadingError + action.payload;
          }
        }
      )
      .addCase(login.fulfilled, (state, action) => {
        state.errorLogin = "";
        state.loadingError = "";
        if (!action.payload) {
          state.errorLogin = "Неправильные логин или пароль.";
        }
      })
      .addCase(
        login.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loadingError = "";
          if (typeof action.payload === "string") {
            state.loadingError = action.payload;
          }
        }
      );
  },
});

export const userDataSliceActions = userDataSlice.actions;
export default userDataSlice.reducer;
