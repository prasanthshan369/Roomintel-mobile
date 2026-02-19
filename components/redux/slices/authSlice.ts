import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import ImportedURL from '../../common/urls';

const { API } = ImportedURL;

export interface AuthState {
  user: string | null;
  token: string | null;
  errorMessage: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  errorMessage: null,
  loading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(API.login, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token, data: user } = res.data;

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await AsyncStorage.setItem('token', token);
      console.log('Login Successful');

      return { user, token };
    } catch (error: any) {
      console.log('Login error in store:', error);
      
        const errorMessage =  error.response?.data?.message || error.message || 'Login failed.';

      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.errorMessage = null;
      delete axios.defaults.headers.common['Authorization'];
      delete axios.defaults.headers.common['X-CSRF-Token'];
      AsyncStorage.removeItem('token').catch(err => console.log('Error removing token:', err));
    },
    clearError: (state) => {
      state.errorMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMessage = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  }
})

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
