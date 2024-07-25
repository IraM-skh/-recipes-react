const RecipeStep: React.FC = () => {
  return (
    <div className="recipe_step">
      <p>Превью картинки в СТЕПЕ</p>
      <input
        type="file"
        name="recipe_step_img"
        multiple
        accept="image/*,image/jpeg"
      />
      <input type="text"></input>
    </div>
  );
};

export default RecipeStep;
