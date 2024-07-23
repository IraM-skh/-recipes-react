import { useParams } from "react-router";
import { useEffect } from "react";

const RecipePage = () => {
  const { recipeId } = useParams<{ recipeId?: string }>();
  useEffect(() => {}, []);

  return <p>Рецепт конкретный {recipeId}</p>;
};

export default RecipePage;
