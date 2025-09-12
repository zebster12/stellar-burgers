import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { TIngredient } from '../../utils/types';
import { useDispatch } from '../../services/store';
import { useSelector } from '../../services/store';
import { checkUserAuth, setIsAuthChecked } from '../../services/user';
import { ProtectedRoute, UnAuthRoute } from '../protectedRoute';
import { ingredientsFetch } from '../../services/ingredientSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.items || []
  );

  const onCloseModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkUserAuth()).finally(() => dispatch(setIsAuthChecked(true)));
  }, [dispatch]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(ingredientsFetch());
    }
  }, [dispatch, ingredients.length]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/register'
          element={
            <UnAuthRoute>
              <Register />
            </UnAuthRoute>
          }
        />
        <Route
          path='/login'
          element={
            <UnAuthRoute>
              <Login />
            </UnAuthRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <UnAuthRoute>
              <ForgotPassword />
            </UnAuthRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <UnAuthRoute>
              <ResetPassword />
            </UnAuthRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        // Для открытия страницы без модального окна, при копировании ссылки
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные маршруты */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal onClose={onCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={''} onClose={onCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
