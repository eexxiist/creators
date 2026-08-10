import { Recipe } from '@/types/recipe.types';
import api from '../lib/axios';

export const RecipeService = {
  async getFeedRecipes() {
    const { data: response } = await api.get<Recipe[]>('/recipes/feed');
    return response;
  },

  async getRecommendedRecipes() {
    const { data: response } = await api.get<Recipe[]>('/recipes/recommended');
    return response;
  },
};
