import styles from "../../pages/CreateRecipePage.module.css";
type TagTypesProps = {
  value: string;
};
const TagTypes: React.FC<TagTypesProps> = (props) => {
  return (
    <label className={styles.checkbox_label}>
      <input type="checkbox" name="tagTypes" value={props.value} />
      <span className={styles.custom_checkbox}>{props.value}</span>
    </label>
  );
};

export default TagTypes;
