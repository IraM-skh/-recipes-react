type TagTypesProps = {
  value: string;
};
const TagTypes: React.FC<TagTypesProps> = (props) => {
  return (
    <label className="checkbox-btn">
      <input type="checkbox" name="tagTypes" value={props.value} />
      <span>{props.value}</span>
    </label>
  );
};

export default TagTypes;
