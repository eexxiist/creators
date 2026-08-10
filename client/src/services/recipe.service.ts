import { Recipe, RecipePreview } from '@/types/recipe.types';
import api from '../lib/axios';

export const RecipeService = {
  async getFeedRecipes() {
    const { data: response } = await api.get<RecipePreview[]>('/recipes/feed');

    return response;
  },

  async getRecommendedRecipes() {
    const { data: response } = await api.get<RecipePreview[]>(
      '/recipes/recommended',
    );

    return response;
  },

  async getRecipe(id: string): Promise<Recipe> {
    const { data } = await api.get<Recipe>(`/recipes/${id}`);

    return data;
  },
};
