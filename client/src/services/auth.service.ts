import { User } from '@/types/user.types';
import api from '../lib/axios';
import { LoginDto, LoginResponse } from '../types/auth.types';

export const AuthService = {
  async login(data: LoginDto) {
    const { data: response } = await api.post<LoginResponse>(
      '/auth/login',
      data,
    );
    return response;
  },

  async getMe() {
    const { data } = await api.get<User>('/users/me');
    return data;
  },
};
