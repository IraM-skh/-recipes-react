import { Fragment } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  newRecipeSliceActions,
  ImageSrc,
} from "../../store/slices/newRecipeSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import styles from "../../pages/CreateRecipePage.module.css";

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
      <div className={styles.image_preloader__img_container}>
        {!props.imgSrc && (
          <Fragment>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#dddddd"
                d="M6 5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m9-4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm-3.448 6.134l-3.76 2.769a.5.5 0 0 1-.436.077l-.087-.034l-1.713-.87L1 11.8V14h14V9.751zM15 2H1v8.635l4.28-2.558a.5.5 0 0 1 .389-.054l.094.037l1.684.855l3.813-2.807a.5.5 0 0 1 .52-.045l.079.05L15 8.495z"
              />
            </svg>
            <p>Нет изображения</p>
          </Fragment>
        )}

        {props.imgSrc && <img src={props.imgSrc}></img>}
      </div>
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
