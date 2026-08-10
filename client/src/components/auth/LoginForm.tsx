'use client';

import { useForm } from 'react-hook-form';
import { useLogin } from '@/hooks/useLogin';
import { LoginDto } from '@/types/auth.types';

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginDto>();
  const { mutate } = useLogin();

  const onSubmit = (data: LoginDto) => {
    mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register('email')} />
        <input type="password" {...register('password')} />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
