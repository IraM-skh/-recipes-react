const LoggedIn: React.FC = () => {
  return (
    <div>
      <div className="users_profile">
        {/* возможно добавить фото? */}
        <p>{localStorage.getItem("login")}</p>
      </div>
      <div className="favorite_recipes">
        <h2>Понравившиеся рецепты</h2>
        <p>Отмечайте рецепты, которые хотите сохранить</p>
      </div>
      <div className="own_recipes">
        <h2>Ваши рецепты</h2>
        <p>
          Поделитесь своими рецептами с другими. Новые комментарии к Вашим будут
          подсвечиваться.
        </p>
      </div>
      <div className="own_comments">
        <h2>Ваши комментарии</h2>
        <p>Прокомментируйте рецепт, который уже попробовали приготовить</p>
      </div>
    </div>
  );
};

export default LoggedIn;
