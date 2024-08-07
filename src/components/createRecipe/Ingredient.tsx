import { DataForDeleteHandler } from "../../pages/CreateRecipePage";
import { newRecipeSliceActions } from "../../store/slices/newRecipeSlice";

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
    <div className="ingredient">
      <input type="text" placeholder="ингредиент" name="ingredient"></input>
      <input
        type="text"
        placeholder="количество"
        name="ingredient_quantity"
      ></input>
      <select name="ingredient_measurement">
        <option>гр.</option>
        <option>ч.л.</option>
        <option>кг.</option>
      </select>
      <button
        onClick={(_) =>
          props.deleteIngredientFieldHandler(_, dataForDeleteHandler)
        }
      >
        Х
      </button>
    </div>
  );
};

export default Ingredient;
