import api from '@/lib/axios';

export const CommentService = {
  async createComment(recipeId: string, content: string) {
    const { data } = await api.post(`/comment/${recipeId}`, { content });
    return data;
  },

  async deleteComment(commentId: string) {
    const { data } = await api.delete(`/comment/${commentId}`);
    return data;
  },
};
