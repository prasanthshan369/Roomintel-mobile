import { configureStore } from '@reduxjs/toolkit';
import type { AuthState } from './slices/authSlice';
import authReducer from './slices/authSlice';
import type { RoomState } from './slices/roomSlice';
import roomReducer from './slices/roomSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomReducer,
  },
});

export type RootState = {
  auth: AuthState;
  rooms: RoomState;
};
export type AppDispatch = typeof store.dispatch;
