import { useState } from "react";
import InputForLoginForm from "./InputForLoginForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  sendRegistration,
  login as sendLogin,
  getIsUserLoggedIn,
} from "../../store/slices/loginDataSlice";
import styles from "../../pages/PersonalAccountPage.module.css";

const NotLoggedIn: React.FC = () => {
  const dispatch = useAppDispatch();
  //-----types
  type inputsInForm = {
    login: HTMLInputElement;
    eMail?: HTMLInputElement;
    password: HTMLInputElement;
    repeat_password?: HTMLInputElement;
    remember: HTMLInputElement;
  };
  //-----states and dispatch
  const [isAccountExist, setIsAccountExist] = useState(true);
  const [isFormFilled, setIsFormFilled] = useState(true);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const {
    errorLogin,
    errorRegistrationLogin,
    errorRegistrationEMail,
    loadingError,
  } = useAppSelector((state) => state.userData);
  //-----handlers
  const switchLoginOrRegistrationHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsAccountExist((state) => !state);
  };

  const loginFormSubmitHandler: React.FormEventHandler<
    HTMLFormElement & inputsInForm
  > = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const {
      login: loginInput,
      eMail: eMailInput,
      password: passwordInput,
      repeat_password: repeatPasswordInput,
      remember: rememberInput,
    } = form;
    //get values

    const login = loginInput.value.trim();
    const eMail = eMailInput?.value.trim();
    const password = passwordInput.value.trim();
    const repeatPassword = repeatPasswordInput?.value.trim();
    const remember = rememberInput.checked;

    if (isAccountExist) {
      if (login && password) {
        setIsFormFilled(() => true);
        setFormErrorMessage(() => "");
      } else {
        setIsFormFilled(() => false);
        setFormErrorMessage(() => "Заполните все поля");
        return;
      }

      //login
      await dispatch(sendLogin({ login, password, remember }));
      dispatch(getIsUserLoggedIn());
      return;
    }

    if (!isAccountExist) {
      if (password !== repeatPassword) {
        setIsFormFilled(() => false);
        setFormErrorMessage(() => "Пароли не совпадают");
        return;
      }
      if (login && eMail && password && repeatPassword) {
        setIsFormFilled(() => true);
        setFormErrorMessage(() => "");
      } else {
        setIsFormFilled(() => false);
        setFormErrorMessage(() => "Заполните все поля");
        return;
      }
      //Registration
      await dispatch(sendRegistration({ login, eMail, password, remember }));
      dispatch(getIsUserLoggedIn());
    }
  };

  const pieceLabelTextForLogin = isAccountExist ? " или e-mail" : "";
  const labelTextForLogin = `Логин${pieceLabelTextForLogin}`;

  return (
    <div className="not_logged_in_container">
      <h2 className={styles.header}>
        Войдите в личный кабинет или зарегистрируйтесь
      </h2>
      <form className={styles.login_form} onSubmit={loginFormSubmitHandler}>
        <InputForLoginForm
          labelText={labelTextForLogin}
          inputName="login"
          setIsFormFilled={setIsFormFilled}
          setFormErrorMessage={setFormErrorMessage}
        ></InputForLoginForm>
        {errorLogin && <p className="error">{errorLogin}</p>}
        {errorRegistrationLogin && (
          <p className="error">{errorRegistrationLogin}</p>
        )}
        {!isAccountExist && (
          <InputForLoginForm
            labelText="E-mail"
            inputName="eMail"
            setIsFormFilled={setIsFormFilled}
            setFormErrorMessage={setFormErrorMessage}
          ></InputForLoginForm>
        )}
        {!isAccountExist && errorRegistrationEMail && (
          <p className="error">{errorRegistrationEMail}</p>
        )}
        <InputForLoginForm
          labelText="Пароль"
          inputName="password"
          setPasswordValue={setPasswordValue}
          setIsFormFilled={setIsFormFilled}
          setFormErrorMessage={setFormErrorMessage}
        ></InputForLoginForm>
        {!isAccountExist && (
          <InputForLoginForm
            labelText="Повторите пароль"
            inputName="repeat_password"
            passwordValue={passwordValue}
            setIsFormFilled={setIsFormFilled}
            setFormErrorMessage={setFormErrorMessage}
          ></InputForLoginForm>
        )}

        <label className={styles.custom_checkbox}>
          <input type="checkbox" name="remember"></input>
          <span>Запомнить меня</span>
        </label>

        <button type="button" onClick={switchLoginOrRegistrationHandler}>
          {isAccountExist && <span>У меня нет аккаунта</span>}
          {!isAccountExist && <span>У меня есть аккаунт</span>}
        </button>
        {!isFormFilled && (
          <p className={styles.all_fields_error + ` error`}>
            {formErrorMessage}
          </p>
        )}
        {loadingError && (
          <p className={styles.all_fields_error + ` error`}>{loadingError}</p>
        )}
        <button type="submit">
          {isAccountExist && <span>Войти</span>}
          {!isAccountExist && <span>Зарегистироваться</span>}
        </button>
      </form>
    </div>
  );
};

export default NotLoggedIn;
