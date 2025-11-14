import { ingredientsFetch, ingridientReducer } from './ingredientSlice';

describe('ingredientsSlice with async thunk', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  it('должен установить loading=true', () => {
    const action = { type: ingredientsFetch.pending.type };
    const state = ingridientReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранить данные при ingredientsFetch.fulfilled', () => {
    const mockData = [
      { _id: '1', name: 'Булка', type: 'bun' },
      { _id: '2', name: 'Соус', type: 'sauce' }
    ];
    const action = { type: ingredientsFetch.fulfilled.type, payload: mockData };
    const state = ingridientReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockData);
    expect(state.error).toBeNull();
  });

  it('должен записать ошибку при ingredientsFetch.rejected', () => {
    const errorMessage = 'Ошибка при загрузке ингредиентов';
    const action = {
      type: ingredientsFetch.rejected.type,
      payload: errorMessage
    };
    const state = ingridientReducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
