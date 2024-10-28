import { NavLink } from "react-router-dom";
import headerStyles from "./Header.module.css";
const Header = () => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.header_intro}>
        <div className={headerStyles.header_description}>
          <h1>Диетические рецепты</h1>
          <p>
            Подбирайте рецепт с учетом особенностей Вашего питайния, а так же
            делитесь своими вкусными рецептами!{" "}
          </p>
        </div>
      </div>
      <menu className={headerStyles.header_menuLinks}>
        <NavLink
          to="/recipes"
          activeClassName={headerStyles.nav_link_active}
          clas
        >
          Рецепты
        </NavLink>
        <NavLink
          to="/create-recipe"
          activeClassName={headerStyles.nav_link_active}
        >
          Добавть рецепт
        </NavLink>
        <NavLink to="/pa" activeClassName={headerStyles.nav_link_active}>
          Личный кабинет
        </NavLink>
      </menu>
    </header>
  );
};

export default Header;
