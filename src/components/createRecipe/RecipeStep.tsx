import { useAppDispatch, useAppSelector } from "../../hooks";
import { newRecipeSliceActions } from "../../store/slices/newRecipeSlice";

const RecipeStep: React.FC = () => {
  const dispatch = useAppDispatch();
  const reader = new FileReader();
  const imgFile = useAppSelector((state) => state.newRecipe.imgFile);
  const imgSrc = useAppSelector((state) => state.newRecipe.imgSrc);
  reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
    if (readerEvent?.target?.result) {
      dispatch(
        newRecipeSliceActions.setImageSrc(readerEvent.target.result.toString())
      );
    }
  };
  //handler
  const addImageHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      dispatch(newRecipeSliceActions.setImage(file));
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="recipe_step">
      <p>{imgSrc} это путь картинки</p>
      <img src={imgSrc ? imgSrc : ""}></img>

      <input
        type="file"
        name="recipe_step_img"
        multiple
        accept="image/*,image/jpeg"
        onChange={addImageHandler}
      />
      <input type="text"></input>
    </div>
  );
};

export default RecipeStep;
