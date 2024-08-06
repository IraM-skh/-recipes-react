import { Fragment } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  newRecipeSliceActions,
  ImageSrc,
} from "../../store/slices/newRecipeSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

type ImagePreloaderProps = {
  inputName: string;
  id: string;
  action:
    | ActionCreatorWithPayload<ImageSrc, "recipesList/setStepSrc">
    | ActionCreatorWithPayload<ImageSrc, "recipesList/setMainImgSrs">;
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
    <Fragment>
      <div className="image_preloader">
        {!props.imgSrc && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 16 16"
          >
            <path
              fill="#888888"
              d="M6 5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m9-4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm-3.448 6.134l-3.76 2.769a.5.5 0 0 1-.436.077l-.087-.034l-1.713-.87L1 11.8V14h14V9.751zM15 2H1v8.635l4.28-2.558a.5.5 0 0 1 .389-.054l.094.037l1.684.855l3.813-2.807a.5.5 0 0 1 .52-.045l.079.05L15 8.495z"
            />
          </svg>
        )}

        {props.imgSrc && <img src={props.imgSrc}></img>}
      </div>
      <input
        type="file"
        name={props.inputName}
        accept="image/*,image/jpeg"
        onChange={addImageHandler}
      />
    </Fragment>
  );
};

export default ImagePreloader;
