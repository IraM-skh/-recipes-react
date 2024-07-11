import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Диетические рецепты</h1>
      <menu>
        <NavLink to="/recipes">Рецепты</NavLink>
        <NavLink to="/create-recipe">Добавть рецепт</NavLink>
        <NavLink to="/pa">Личный кабинет</NavLink>
      </menu>
    </header>
  );
};

export default Header;
