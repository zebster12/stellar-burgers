import { ordersReducer } from './orderSlice';
import {
  getFeedsThunk,
  getOrderByNumberThunk,
  postUserBurderThunk,
  getUserOrdersThunk,
  setNewOrder
} from './orderSlice';

import type { OrderState } from './orderSlice';
import type { TOrder } from '@utils-types';

describe('ordersSlice', () => {
  const initialState: OrderState = {
    feed: {
      success: false,
      total: 0,
      totalToday: 0,
      orders: []
    },
    userOrders: [],
    orderByNumber: null,
    newOrder: {
      order: null,
      name: ''
    },
    orderRequest: false,
    loading: false,
    error: null
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      number: 123,
      name: 'Test burger',
      status: 'done',
      ingredients: [],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
    {
      _id: '2',
      number: 124,
      name: 'Space burger',
      status: 'pending',
      ingredients: [],
      createdAt: '2024-01-02T00:00:00.000Z',
      updatedAt: '2024-01-02T00:00:00.000Z'
    }
  ];

  it('должен обработать getFeedsThunk.pending', () => {
    const nextState = ordersReducer(initialState, {
      type: getFeedsThunk.pending.type
    });
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('должен обработать getFeedsThunk.fulfilled', () => {
    const payload = {
      success: true,
      total: 200,
      totalToday: 5,
      orders: mockOrders
    };

    const nextState = ordersReducer(initialState, {
      type: getFeedsThunk.fulfilled.type,
      payload
    });

    expect(nextState.loading).toBe(false);
    expect(nextState.feed.orders).toEqual(mockOrders);
    expect(nextState.feed.total).toBe(200);
    expect(nextState.feed.totalToday).toBe(5);
  });

  it('должен обработать getFeedsThunk.rejected', () => {
    const nextState = ordersReducer(initialState, {
      type: getFeedsThunk.rejected.type,
      payload: 'Ошибка загрузки'
    });

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка загрузки');
  });

  it('должен обработать setNewOrder', () => {
    const nextState = ordersReducer(initialState, {
      type: setNewOrder.type,
      payload: true
    });

    expect(nextState.orderRequest).toBe(true);
    expect(nextState.newOrder.order).toBeNull();
  });
});
