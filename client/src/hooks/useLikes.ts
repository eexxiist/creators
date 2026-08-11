import { LikeService } from '@/services/like.service';
import { LikeStatus } from '@/types/like.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useLikes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LikeService.addLike,
    onSuccess: (_, recipeId) => {
      queryClient.invalidateQueries({
        queryKey: ['recipe', recipeId],
      });

      queryClient.invalidateQueries({
        queryKey: ['like-status', recipeId],
      });
    },
  });
};

export const useUnlike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LikeService.removeLike,
    onSuccess: (_, recipeId) => {
      queryClient.invalidateQueries({
        queryKey: ['recipe', recipeId],
      });

      queryClient.invalidateQueries({
        queryKey: ['like-status', recipeId],
      });
    },
  });
};

export const useLikeStatus = (recipeId: string) => {
  const query = useQuery({
    queryKey: ['like-status', recipeId],
    queryFn: () => LikeService.getLikes(recipeId),
  });

  return query;
};
