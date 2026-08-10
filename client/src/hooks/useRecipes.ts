import { RecipeService } from '@/services/recipe.service';
import { Recipe } from '@/types/recipe.types';
import { useQuery } from '@tanstack/react-query';

export const useFeedRecipes = () => {
  const query = useQuery({
    queryKey: ['feed'],
    queryFn: RecipeService.getFeedRecipes,
  });

  return query;
};

export const useRecommendedRecipes = () => {
  const query = useQuery({
    queryKey: ['recommended'],
    queryFn: RecipeService.getRecommendedRecipes,
  });

  return query;
};

export const useRecipe = (id: string) => {
  const query = useQuery<Recipe>({
    queryKey: ['recipe', id],
    queryFn: () => RecipeService.getRecipe(id),
  });

  return query;
};
