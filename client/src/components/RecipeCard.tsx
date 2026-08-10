import { Recipe } from '@/types/recipe.types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div>
      <h2>{recipe.title}</h2>
    </div>
  );
};

export default RecipeCard;
