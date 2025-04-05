import type { IFormLogin, IFormNewUser } from '@/interfaces/form-user';
import { toast } from 'vue-sonner';
import { api } from './api';

export const handleSignIn = async ({
  email,
  password,
}: IFormLogin): Promise<{ access_token: string }> => {
  return await api
    .post('/signin', { email, password })
    .then((res) => res.data)
    .catch(() => {
      toast.error('Erro ao realizar login');
    });
};

export const handleSignUp = async ({ email, password, name }: IFormNewUser): Promise<void> => {
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
  const response = await api.post('/signup', { email, password, name, avatar });
  return response.data;
};
