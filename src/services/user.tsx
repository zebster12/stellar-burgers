import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../utils/cookie';
import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (newUserData: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(newUserData);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (err: any) {
      return rejectWithValue(
        err.message || 'Ошибка регистрации нового пользователя'
      );
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(loginData);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка входа (логина)');
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async (userPartialData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userPartialData);
      return response.user;
    } catch (err: any) {
      return rejectWithValue(
        err.message || 'Ошибка изменения данных пользователя'
      );
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await logoutApi();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка выхода из системы');
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch, rejectWithValue }) => {
    const token = getCookie('accessToken');
    if (!token) {
      return rejectWithValue('No access token');
    }

    try {
      const user = await getUserApi();
      dispatch(setUser(user.user));
      return user.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка проверки авторизации');
    }
  }
);

export const setIsAuthChecked = createAction<boolean, 'user/setIsAuthChecked'>(
  'user/setIsAuthChecked'
);

export interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setIsAuthChecked, (state, action) => {
        state.isAuthChecked = action.payload;
      })

      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUserLoading: (state) => state.loading,
    selectError: (state) => state.error
  }
});
export const {
  selectUser,
  selectIsAuthChecked,
  selectUserLoading,
  selectError
} = userSlice.selectors;
export const { setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
