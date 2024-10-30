import { DataForDeleteHandler } from "../../pages/CreateRecipePage";
import { newRecipeSliceActions } from "../../store/slices/newRecipeSlice";
import styles from "../../pages/CreateRecipePage.module.css";
import { useAppSelector } from "../../hooks";

type IngredientProps = {
  deleteIngredientFieldHandler: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: DataForDeleteHandler
  ) => void;
  id: string;
};

const Ingredient: React.FC<IngredientProps> = (props) => {
  // state
  const measurements = useAppSelector(
    (state) => state.recipesDetails.measurements.measurements
  );
  // handlers
  const dataForDeleteHandler = {
    id: props.id,
    action: newRecipeSliceActions.removeIngredientField,
  };
  // JSX
  return (
    <div className={styles.ingredient}>
      <input type="text" placeholder="ингредиент" name="ingredient"></input>
      <input
        type="text"
        placeholder="количество"
        name="ingredient_quantity"
      ></input>
      <select name="ingredient_measurement">
        {measurements.map((measurement) => (
          <option value={measurement}>{measurement}</option>
        ))}
      </select>
      <button
        onClick={(_) =>
          props.deleteIngredientFieldHandler(_, dataForDeleteHandler)
        }
      >
        x
      </button>
    </div>
  );
};

export default Ingredient;
