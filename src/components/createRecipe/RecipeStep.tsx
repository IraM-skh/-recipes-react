import { useAppDispatch, useAppSelector } from "../../hooks";
import { DataForDeleteHandler } from "../../pages/CreateRecipePage";
import { newRecipeSliceActions } from "../../store/slices/newRecipeSlice";
import ImagePreloader from "./ImagePreloader";

type RecipeStepProps = {
  deleteStepHandler: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: DataForDeleteHandler
  ) => void;
  id: string;
  imgSrc: string;
};

const RecipeStep: React.FC<RecipeStepProps> = (props) => {
  //JSX
  const dataForDeleteStepHandler = {
    id: props.id,
    action: newRecipeSliceActions.removeStep,
  };
  return (
    <div className="recipe_step">
      <ImagePreloader
        inputName="recipe_step_img"
        action={newRecipeSliceActions.setStepSrc}
        id={props.id}
        imgSrc={props.imgSrc}
      ></ImagePreloader>
      <input type="text" name={props.id}></input>
      <button
        onClick={(_) => props.deleteStepHandler(_, dataForDeleteStepHandler)}
      >
        Х
      </button>
    </div>
  );
};

export default RecipeStep;
