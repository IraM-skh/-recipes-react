import { useState } from "react";

type CheckboxProps = {
  value: string;
  name: string;
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const [isChecked, setIsChecked] = useState(true);
  const changeCheckedCheckbox: React.FormEventHandler<HTMLInputElement> = (
    event
  ) => {
    setIsChecked((prev) => !prev);
  };
  return (
    <input
      type="checkbox"
      name={props.name}
      value={props.value}
      checked={isChecked}
      onClick={changeCheckedCheckbox}
    ></input>
  );
};
export default Checkbox;
