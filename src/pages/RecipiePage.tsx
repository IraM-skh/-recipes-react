import { useParams } from "react-router";

const RecipePage = () => {
  const { recipeId } = useParams<{ recipeId?: string }>();
  return <p>Рецепт конкретный {recipeId}</p>;
};

export default RecipePage;
