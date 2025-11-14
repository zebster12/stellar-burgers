import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  swapIngredient,
  clearBurger,
  initialState
} from './constructorSlice';

const bun = {
  _id: 'bun123',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 125,
  image: 'bun.png',
  image_mobile: 'bun_mobile.png',
  image_large: 'bun_large.png'
};

const main = {
  _id: 'main123',
  name: 'Мясо бессмертных моллюсков',
  type: 'main',
  proteins: 80,
  fat: 24,
  carbohydrates: 40,
  calories: 800,
  price: 1300,
  image: 'meat.png',
  image_mobile: 'meat_mobile.png',
  image_large: 'meat_large.png'
};

const sauce = {
  _id: 'sauce123',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 100,
  price: 90,
  image: 'sauce.png',
  image_mobile: 'sauce_mobile.png',
  image_large: 'sauce_large.png'
};

describe('constructorSlice', () => {
  it('возвращает initialState по умолчанию', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('добавляет булку', () => {
    const state = constructorReducer(initialState, addIngredient(bun));
    expect(state.burger.bun).toEqual(
      expect.objectContaining({ _id: 'bun123' })
    );
    expect(state.burger.ingredients).toHaveLength(0);
  });

  it('добавляет ингредиенты (main или sauce)', () => {
    const state = constructorReducer(initialState, addIngredient(main));
    const newState = constructorReducer(state, addIngredient(sauce));

    expect(newState.burger.ingredients).toHaveLength(2);
    expect(newState.burger.ingredients[0]._id).toBe('main123');
    expect(newState.burger.ingredients[1]._id).toBe('sauce123');
    expect(newState.burger.bun).toBeNull();
  });

  it('удаляет ингредиент по _id', () => {
    const state = constructorReducer(initialState, addIngredient(main));
    const newState = constructorReducer(state, removeIngredient('main123'));

    expect(newState.burger.ingredients).toHaveLength(0);
  });

  it('меняет ингредиенты местами', () => {
    let state = constructorReducer(initialState, addIngredient(main));
    state = constructorReducer(state, addIngredient(sauce));

    const swappedState = constructorReducer(
      state,
      swapIngredient({ first: 0, second: 1 })
    );

    expect(swappedState.burger.ingredients[0]._id).toBe('sauce123');
    expect(swappedState.burger.ingredients[1]._id).toBe('main123');
  });

  it('очищает бургер', () => {
    let state = constructorReducer(initialState, addIngredient(bun));
    state = constructorReducer(state, addIngredient(main));
    state = constructorReducer(state, addIngredient(sauce));

    const clearedState = constructorReducer(state, clearBurger());

    expect(clearedState.burger.bun).toBeNull();
    expect(clearedState.burger.ingredients).toHaveLength(0);
  });
});
