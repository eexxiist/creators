import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import { ACCESS_TOKEN } from '@/constants/auth.constants';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      const token = data.token;
      localStorage.setItem(ACCESS_TOKEN, token);
      router.push('/');
    },
  });
};
