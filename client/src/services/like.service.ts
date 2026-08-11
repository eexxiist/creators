import { LikeStatus } from '@/types/like.types';
import api from '../lib/axios';

export const LikeService = {
  async addLike(recipeId: string) {
    const { data } = await api.post(`/like/${recipeId}`);
    return data;
  },

  async removeLike(recipeId: string) {
    const { data } = await api.delete(`/like/${recipeId}`);
    return data;
  },

  async getLikes(recipeId: string) {
    const { data } = await api.get<LikeStatus>(`/like/recipe/${recipeId}`);
    return data;
  },
};
