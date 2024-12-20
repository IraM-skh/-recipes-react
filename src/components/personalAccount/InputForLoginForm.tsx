import { useEffect, useState } from "react";

type InputForLoginFormProps = {
  labelText: string;
  inputName: string;
  passwordValue?: {
    pass: string;
    repeatPass: string;
  };

  setPasswordValue?: React.Dispatch<
    React.SetStateAction<{
      pass: string;
      repeatPass: string;
    }>
  >;
  setIsFormFilled: React.Dispatch<React.SetStateAction<boolean>>;
  setFormErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const InputForLoginForm: React.FC<InputForLoginFormProps> = (props) => {
  const [isInputCorrect, setIsInputCorrect] = useState(true);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  useEffect(() => {
    if (props.inputName === "repeat_password") {
      if (props.passwordValue?.pass === props.passwordValue?.repeatPass) {
        resetErrorMessage();
      }
    }
  }, [props.passwordValue?.pass, props.passwordValue?.repeatPass]);
  const resetErrorMessage = () => {
    setIsInputCorrect(() => true);
    setInputErrorMessage(() => "");
    props.setIsFormFilled(() => true);
  };
  const setFormFilledAndErrorMessage = () => {
    props.setIsFormFilled(() => false);
    props.setFormErrorMessage(() => "Заполните все поля корректно!");
  };
  const inputBlurHandler: React.FocusEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (props.inputName === "login") {
      if (
        event.target.value.trim().length < 4 ||
        event.target.value.trim().length > 20
      ) {
        setIsInputCorrect(() => false);
        setFormFilledAndErrorMessage();
        setInputErrorMessage(() => "Логин должен состоять из 4-20 символов");
      } else {
        resetErrorMessage();
      }
      return;
    }
    if (props.inputName === "eMail") {
      const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
      if (!EMAIL_REGEXP.test(event.target.value.trim())) {
        setIsInputCorrect(() => false);
        setFormFilledAndErrorMessage();
        setInputErrorMessage(() => "Введите корректный e-mail");
      } else {
        resetErrorMessage();
      }

      return;
    }
    if (props.inputName === "password") {
      if (
        event.target.value.trim().length < 4 ||
        event.target.value.trim().length > 30
      ) {
        setIsInputCorrect(() => false);
        setFormFilledAndErrorMessage();
        setInputErrorMessage(() => "Пароль должен состоять из 4-30 символов");
      } else {
        resetErrorMessage();
      }
      if (props.setPasswordValue && event.target.value.trim()) {
        props.setPasswordValue((prev) => {
          prev.pass = event.target.value.trim();
          return prev;
        });
      }
      return;
    }
    if (props.inputName === "repeat_password") {
      if (props.setPasswordValue && event.target.value.trim()) {
        props.setPasswordValue((prev) => {
          prev.repeatPass = event.target.value.trim();
          return prev;
        });
      }

      if (props.passwordValue?.pass !== event.target.value.trim()) {
        setIsInputCorrect(() => false);
        setFormFilledAndErrorMessage();
        setInputErrorMessage(() => "Пароли не совпадают");
      } else {
        resetErrorMessage();
      }
      return;
    }
  };

  return (
    <label>
      <span>{props.labelText}:</span>
      <input
        type="text"
        name={props.inputName}
        onBlur={inputBlurHandler}
        required
      ></input>
      {!isInputCorrect && <p>{inputErrorMessage}</p>}
    </label>
  );
};
export default InputForLoginForm;
