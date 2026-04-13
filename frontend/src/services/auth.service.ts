import api from './api';
import type { LoginDto,RegisterDto,AuthResponse } from '../types/auth.types';

export const login = async (data: LoginDto): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterDto): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};