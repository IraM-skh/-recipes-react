import { DataForDeleteHandler } from "../../pages/CreateRecipePage";
import { newRecipeSliceActions } from "../../store/slices/newRecipeSlice";
import styles from "../../pages/CreateRecipePage.module.css";

type IngredientProps = {
  deleteIngredientFieldHandler: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: DataForDeleteHandler
  ) => void;
  id: string;
};

const Ingredient: React.FC<IngredientProps> = (props) => {
  const dataForDeleteHandler = {
    id: props.id,
    action: newRecipeSliceActions.removeIngredientField,
  };

  return (
    <div className={styles.ingredient}>
      <input type="text" placeholder="ингредиент" name="ingredient"></input>
      <input
        type="text"
        placeholder="количество"
        name="ingredient_quantity"
      ></input>
      <select name="ingredient_measurement">
        <option value="гр.">гр.</option>
        <option value="ч.л.">ч.л.</option>
        <option value="кг.">кг.</option>
        <option value="по вкусу">по вкусу</option>
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
