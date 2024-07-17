import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Redirect, Route, Switch } from "react-router";
import RecipesPage from "./pages/RecipesPage";
import PersonalAccountPage from "./pages/PersonalAccountPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import RecipePage from "./pages/RecipePage";
import getRecipesData from "./dataFromServer/Recipes";

import { getHttp } from "./dataFromServer/httpRequest";
import { RECIPES } from "./dataFromServer/Recipes";

function App() {
  getRecipesData();
  (async function w1() {
    const test = [1, 2, 3, 4];
    const data = JSON.stringify(test);
    // let recipesData = fetch(
    //   "https://react-course-http-30914-default-rtdb.firebaseio.com//recipes.json",
    //   {
    //     method: "POST",
    //     body: data,
    //     headers: {
    //       "Content-Type": "applicatio/json",
    //     },
    //   }
    // );
    const recipesData = await getHttp(
      "https://recipes-7e232-default-rtdb.firebaseio.com/Recipes.json"
    );

    console.log(data);
    console.log(recipesData);
  })();
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
