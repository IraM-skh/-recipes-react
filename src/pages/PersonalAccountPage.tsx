import { useEffect } from "react";
import LoggedIn from "../components/personalAccount/LoggedIn";
import NotLoggedIn from "../components/personalAccount/NotLoggedIn";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getIsUserLoggedIn } from "../store/slices/loginDataSlice";

const PersonalAccountPage: React.FC = () => {
  const isUserLoggedIn = useAppSelector((state) => state.userData);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getIsUserLoggedIn());
  }, []);

  return (
    <div>
      {isUserLoggedIn.isLogin && (
        <LoggedIn login={isUserLoggedIn.login}></LoggedIn>
      )}
      {!isUserLoggedIn.isLogin && <NotLoggedIn></NotLoggedIn>}
    </div>
  );
};

export default PersonalAccountPage;
