import { Comment, DeleteComment } from '../types/comment.types';
import { CommentService } from '@/services/comment.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ recipeId, content }: Comment) => {
      return CommentService.createComment(recipeId, content);
    },
    onSuccess: (_, { recipeId }) => {
      queryClient.invalidateQueries({
        queryKey: ['recipe', recipeId],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId }: DeleteComment) => {
      return CommentService.deleteComment(commentId);
    },
    onSuccess: (_, { recipeId }) => {
      queryClient.invalidateQueries({
        queryKey: ['recipe', recipeId],
      });
    },
  });
};

