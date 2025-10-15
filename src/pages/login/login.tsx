import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  loginUserThunk,
  selectError,
  selectUserLoading
} from '../../services/userSlice/userSlice';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  // Правильная деструктуризация based на возвращаемом объекте
  const { form, setValue } = useForm({
    email: 'valera123321@mail.ru',
    password: '123456789'
  });

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const loading = useSelector(selectUserLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk(form)); // Используем form вместо values
  };

  if (loading) return <Preloader />;

  return (
    <LoginUI
      errorText={error || ''}
      email={form.email} // Используем form.email
      setEmail={(value) => setValue('email', value)} // Используем setValue
      password={form.password} // Используем form.password
      setPassword={(value) => setValue('password', value)} // Используем setValue
      handleSubmit={handleSubmit}
    />
  );
};
