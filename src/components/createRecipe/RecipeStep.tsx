import { DataForDeleteHandler } from "../../pages/CreateRecipePage";
import { newRecipeSliceActions } from "../../store/slices/newRecipeSlice";
import ImagePreloader from "./ImagePreloader";
import styles from "../../pages/CreateRecipePage.module.css";

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
    <div className={styles.recipe_step}>
      <div className={styles.preloader_external_container}>
        <div className={styles.preloader_interior_container}>
          <ImagePreloader
            inputName={`recipe_step_img[${props.id}]`}
            action={newRecipeSliceActions.setStepSrc}
            id={props.id}
            imgSrc={props.imgSrc}
          ></ImagePreloader>
        </div>
      </div>
      <textarea name={props.id}></textarea>

      <button
        onClick={(_) => props.deleteStepHandler(_, dataForDeleteStepHandler)}
      >
        x
      </button>
    </div>
  );
};

export default RecipeStep;
