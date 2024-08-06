import { useAppDispatch, useAppSelector } from "../../hooks";
import { newRecipeSliceActions } from "../../store/slices/newRecipeSlice";
import ImagePreloader from "./ImagePreloader";

type RecipeStepProps = {
  deleteStepHandler: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
  id: string;
  imgSrc: string;
};

const RecipeStep: React.FC<RecipeStepProps> = (props) => {
  const dispatch = useAppDispatch();
  const reader = new FileReader();

  //JSX

  return (
    <div className="recipe_step">
      <ImagePreloader
        inputName="recipe_step_img"
        action={newRecipeSliceActions.setStepSrc}
        id={props.id}
        imgSrc={props.imgSrc}
      ></ImagePreloader>
      <input type="text"></input>
      <button onClick={(_) => props.deleteStepHandler(_, props.id)}>Х</button>
    </div>
  );
};

export default RecipeStep;
