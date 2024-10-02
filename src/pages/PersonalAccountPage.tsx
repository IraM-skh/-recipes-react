import { useEffect } from "react";
import LoggedIn from "../components/personalAccount/LoggedIn";
import NotLoggedIn from "../components/personalAccount/NotLoggedIn";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getIsUserLoggedIn } from "../store/slices/loginDataSlice";
import { useParams } from "react-router";

const PersonalAccountPage: React.FC = () => {
  const isUserLoggedIn = useAppSelector((state) => state.userData);
  const { login } = useParams<{ login?: string }>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getIsUserLoggedIn());
  }, []);

  return (
    <div>
      {(login || isUserLoggedIn.isLogin) && (
        <LoggedIn
          loginFromCookie={isUserLoggedIn.login}
          loginFromUrl={login}
        ></LoggedIn>
      )}
      {!login && !isUserLoggedIn.isLogin && <NotLoggedIn></NotLoggedIn>}
    </div>
  );
};

export default PersonalAccountPage;
