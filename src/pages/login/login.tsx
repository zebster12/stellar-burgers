import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { loginUserThunk, selectUserLoading } from '../../services/user';

export const Login: FC = () => {
  const [email, setEmail] = useState('nikita123@mail.ru');
  const [password, setPassword] = useState('123456789');
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }));
  };

  const loading = useSelector(selectUserLoading);
  if (loading) return <Preloader />;

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
