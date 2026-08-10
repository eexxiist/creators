import { RecipeService } from '@/services/recipe.service';
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
