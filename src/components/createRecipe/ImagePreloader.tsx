import { Fragment } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  newRecipeSliceActions,
  ImageSrc,
} from "../../store/slices/newRecipeSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import styles from "../../pages/CreateRecipePage.module.css";
import NoImg from "../NoImg";

type ImagePreloaderProps = {
  inputName: string;
  id: string;
  action:
    | ActionCreatorWithPayload<ImageSrc, "newRecipe/setStepSrc">
    | ActionCreatorWithPayload<ImageSrc, "newRecipe/setMainImgSrs">;
  imgSrc: string;
};
type src = {
  [key: number | string]: string;
};
const ImagePreloader: React.FC<ImagePreloaderProps> = (props) => {
  const dispatch = useAppDispatch();
  const reader = new FileReader();

  reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
    if (readerEvent?.target?.result) {
      const src = readerEvent.target.result.toString();
      dispatch(
        props.action({
          imgSrc: src,
          id: props.id,
        })
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
    <div className={styles.image_preloader}>
      {!props.imgSrc && <NoImg />}
      {props.imgSrc && (
        <div className={styles.image_preloader__img_container}>
          <img src={props.imgSrc}></img>
        </div>
      )}
      <label
        htmlFor={props.inputName + props.id}
        className={styles.file_uploader__custom_button}
      >
        {!props.imgSrc ? (
          <span>Загрузить фото</span>
        ) : (
          <span>Поменять фото</span>
        )}
      </label>
      <input
        type="file"
        id={props.inputName + props.id}
        name={props.inputName}
        accept="image/*,image/jpeg"
        onChange={addImageHandler}
        className={styles.file_uploader}
      />
    </div>
  );
};

export default ImagePreloader;
