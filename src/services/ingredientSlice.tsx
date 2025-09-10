import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

const ingredientsFetch = createAsyncThunk(
  'ingredients/fetchAll',
  async (_, thunkAPI) => {
    try {
      console.log(thunkAPI);
      return await getIngredientsApi();
    } catch (error) {
      console.error(error);
    }
  }
);

interface IngredientsState {
  items: TIngredient[] | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ingredientsFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ingredientsFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(ingredientsFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const ingridientReducer = ingredientsSlice.reducer;
export { ingredientsFetch };
