import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import ImportedURL from '../../common/urls';

const { API } = ImportedURL;

export interface Room {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  previewImage?: string;
  images?: string[];
  location?: string;
  address?: string;
  price?: string | number;
  pricePerDay?: string | number;
  rating?: number;
  image?: string;
  thumbnail?: string;
  imageUrl?: string;
  description?: string;
  [key: string]: any;
}

export interface RoomState {
  rooms: Room[];
  currentRoom: Room | null;
  loading: boolean;
  errorMessage: string | null;
}

const initialState: RoomState = {
  rooms: [],
  currentRoom: null,
  loading: false,
  errorMessage: null,
};

export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(API.rooms, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Handle different response structures
      let roomsData = [];

      if (Array.isArray(res.data)) {
        roomsData = res.data;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        roomsData = res.data.data;
      } else if (res.data?.rooms && Array.isArray(res.data.rooms)) {
        roomsData = res.data.rooms;
      } else if (res.data?.result && Array.isArray(res.data.result)) {
        roomsData = res.data.result;
      } else if (typeof res.data === 'object' && Object.values(res.data).length > 0) {
        // If it's an object, try to extract array from it
        const firstValue = Object.values(res.data)[0];
        if (Array.isArray(firstValue)) {
          roomsData = firstValue;
        } else {
          roomsData = [res.data];
        }
      }

      if (!Array.isArray(roomsData)) {
        roomsData = [];
      }

      return roomsData;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to fetch rooms.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchRoomById = createAsyncThunk(
  'rooms/fetchRoomById',
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API.rooms}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      let roomData = res.data;

      // Handle different response structures
      if (res.data?.data) {
        roomData = res.data.data;
      } else if (res.data?.room) {
        roomData = res.data.room;
      }

      return roomData;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to fetch room details.';
      return rejectWithValue(errorMessage);
    }
  }
);

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    clearError: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMessage = null;
        // Ensure payload is always an array
        state.rooms = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
        state.rooms = [];
      })
      .addCase(fetchRoomById.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMessage = null;
        state.currentRoom = action.payload as Room;
      })
      .addCase(fetchRoomById.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
        state.currentRoom = null;
      });
  },
});

export const { clearError } = roomSlice.actions;
export default roomSlice.reducer;
