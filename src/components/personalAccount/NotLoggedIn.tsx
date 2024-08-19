import { useState } from "react";
import InputForLoginForm from "./InputForLoginForm";

const NotLoggedIn: React.FC = () => {
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
  //-----handlers
  const switchLoginOrRegistrationHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsAccountExist((state) => !state);
  };

  const loginFormSubmitHandler: React.FormEventHandler<
    HTMLFormElement & inputsInForm
  > = (event) => {
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
    const isRememberUser = rememberInput.checked;

    if (isAccountExist) {
      if (login && password) {
        setIsFormFilled(() => true);
        setFormErrorMessage(() => "");
      } else {
        setIsFormFilled(() => false);
        setFormErrorMessage(() => "Заполните все поля");
        return;
      }
      //Отправка данных на сервер
      console.log(login, password, isRememberUser);
      localStorage.setItem("login", login);
      return;
    }

    if (!isAccountExist) {
      if (login && eMail && password && repeatPassword) {
        setIsFormFilled(() => true);
        setFormErrorMessage(() => "");
      } else {
        setIsFormFilled(() => false);
        setFormErrorMessage(() => "Заполните все поля");
        return;
      }
      //Отправка данных на сервер
      localStorage.setItem("login", login);
      console.log(login, eMail, password, isRememberUser);
    }
  };
  const pieceLabelTextForLogin = isAccountExist ? " или e-mail" : "";
  const labelTextForLogin = `Логин${pieceLabelTextForLogin}`;
  return (
    <div className="not_logged_in_container">
      <h2>Войдите в личный кабинет или зарегистрируйтесь</h2>
      <form className="login_form" onSubmit={loginFormSubmitHandler}>
        <InputForLoginForm
          labelText={labelTextForLogin}
          inputName="login"
          setIsFormFilled={setIsFormFilled}
        ></InputForLoginForm>
        {!isAccountExist && (
          <InputForLoginForm
            labelText="E-mail"
            inputName="eMail"
            setIsFormFilled={setIsFormFilled}
          ></InputForLoginForm>
        )}
        <InputForLoginForm
          labelText="Пароль"
          inputName="password"
          setPasswordValue={setPasswordValue}
          setIsFormFilled={setIsFormFilled}
        ></InputForLoginForm>
        {!isAccountExist && (
          <InputForLoginForm
            labelText="Повторите пароль"
            inputName="repeat_password"
            passwordValue={passwordValue}
            setIsFormFilled={setIsFormFilled}
          ></InputForLoginForm>
        )}

        <label>
          <input type="checkbox" name="remember"></input>
          <span>Запомнить меня</span>
        </label>
        <br></br>
        <button type="button" onClick={switchLoginOrRegistrationHandler}>
          {isAccountExist && <span>У меня нет аккаунта</span>}
          {!isAccountExist && <span>У меня есть аккаунт</span>}
        </button>
        {!isFormFilled && <p>{formErrorMessage}</p>}
        <button type="submit">
          {isAccountExist && <span>Войти</span>}
          {!isAccountExist && <span>Зарегистироваться</span>}
        </button>
      </form>
    </div>
  );
};

export default NotLoggedIn;
