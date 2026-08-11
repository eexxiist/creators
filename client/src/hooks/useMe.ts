import { AuthService } from '@/services/auth.service';
import { useQuery } from '@tanstack/react-query';

export const useMe = () => {
  const query = useQuery({
    queryKey: ['me'],
    queryFn: AuthService.getMe,
  });
  return query;
};
