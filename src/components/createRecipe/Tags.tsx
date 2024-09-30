import styles from "../../pages/CreateRecipePage.module.css";
type TagsProps = {
  value: string;
  inputName: string;
};
const Tags: React.FC<TagsProps> = (props) => {
  return (
    <label className={styles.checkbox_label}>
      <input type="checkbox" name={props.inputName} value={props.value} />
      <span className={styles.custom_checkbox}>{props.value}</span>
    </label>
  );
};

export default Tags;
