import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  selectBurgerConstructor,
  clearBurger
} from '../../services/constructorSlice';
import { selectUser } from '../../services/user';
import {
  postUserBurderThunk,
  selectNewOrder,
  selectOrderRequest,
  setNewOrder
} from '../../services/orderSlice';
import { AppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const userBurger = useSelector(selectBurgerConstructor);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectNewOrder).order;

  const onOrderClick = () => {
    if (!userBurger.bun || orderRequest) {
      return;
    }

    if (!user) {
      return navigate('/login', {
        replace: true,
        state: {
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }
      });
    } else {
      const from = location.state?.from || { pathname: '/' };
      const backgroundLocation = location.state?.from?.background || null;

      const itemsId = [
        userBurger.bun._id,
        ...userBurger.ingredients.map((ingredient) => ingredient._id),
        userBurger.bun._id
      ];

      dispatch(postUserBurderThunk(itemsId)).then(() =>
        dispatch(clearBurger())
      );
      return navigate(from, {
        replace: true,
        state: { background: backgroundLocation }
      });
    }
  };

  const closeOrderModal = () => {
    dispatch(setNewOrder(false));
  };

  const price = useMemo(
    () =>
      (userBurger.bun ? userBurger.bun.price * 2 : 0) +
      userBurger.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [userBurger]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={userBurger}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
