import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Redirect, Route, Switch } from "react-router";
import RecipesPage from "./pages/RecipesPage";
import PersonalAccountPage from "./pages/PersonalAccountPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import RecipePage from "./pages/RecipiePage";

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/recipes"></Redirect>
        </Route>
        <Route path="/recipes" exact>
          <RecipesPage />
        </Route>
        <Route path="/pa" exact>
          <PersonalAccountPage />
        </Route>
        <Route path="/create-recipe" exact>
          <CreateRecipePage />
        </Route>
        <Route path="/recipe/:recipeId" exact>
          <RecipePage></RecipePage>
        </Route>
      </Switch>
      <Footer />
    </Fragment>
  );
}

export default App;
