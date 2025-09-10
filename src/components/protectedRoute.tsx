import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useSelector } from '../services/store';
import { Preloader } from '@ui';
import { selectIsAuthChecked, selectUser } from '../services/user';
export const ProtectedRoute = ({
  children
}: {
  children: React.ReactElement;
}) => {
  const user = useSelector(selectUser);
  const location = useLocation();

  if (user) return children;
  return (
    <Navigate
      to='/login'
      state={{
        from: {
          ...location,
          background: location.state?.background,
          state: null
        }
      }}
      replace
    />
  );
};

export const UnAuthRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();
  const backgroundLocation = location.state?.from?.background || null;
  const from = location.state?.from || { pathname: '/' };

  if (!isAuthChecked) return <Preloader />;
  if (!user) return children;

  return (
    <Navigate replace to={from} state={{ background: backgroundLocation }} />
  );
};
