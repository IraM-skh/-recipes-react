import LoggedIn from "../components/personalAccount/LoggedIn";
import NotLoggedIn from "../components/personalAccount/NotLoggedIn";

const PersonalAccountPage = () => {
  const isLogged: boolean = localStorage.getItem("login") ? true : false;
  return (
    <div>
      {isLogged && <LoggedIn></LoggedIn>}
      {!isLogged && <NotLoggedIn></NotLoggedIn>}
    </div>
  );
};

export default PersonalAccountPage;
