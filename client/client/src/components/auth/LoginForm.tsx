'use client';

import { useForm } from 'react-hook-form';
import { useLogin } from '@/hooks/useLogin';
import { LoginDto } from '@/types/auth.types';

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginDto>();
  const { mutate } = useLogin();

  const onSubmit = (data: LoginDto) => {
    console.log('Форма отправлена', data);
    mutate(data);
    console.log('mutate вызван');
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
