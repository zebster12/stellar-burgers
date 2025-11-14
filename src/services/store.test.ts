import { rootReducer } from './store';

describe('Redux store', () => {
  test('initialization of the rootReducer', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const result = rootReducer(undefined, action);

    expect(result).toEqual({
      burgerConstructor: {
        burger: {
          bun: null,
          ingredients: []
        },

        isLoading: false,
        error: undefined
      },

      orders: {
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
      },

      ingredients: {
        items: [],
        loading: false,
        error: null
      },

      user: {
        user: null,
        isAuthChecked: false,
        loading: false,
        error: null
      }
    });
  });
});
