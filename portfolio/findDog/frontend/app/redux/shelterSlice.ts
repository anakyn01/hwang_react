// src/redux/shelterSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Animal {
  id: number;
  status: 'ACTIVE' | 'COMPLETED';
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
  breed: string;
  noticeNo: string;
  regDate: string;
  rescueLocation: string;
  imageUrl: string;
}

interface ShelterState {
  activeTab: string;
  isAlertOn: boolean;
  animals: Animal[];
  loading: boolean;
  error: string | null;
}

const initialState: ShelterState = {
  activeTab: '보호동물',
  isAlertOn: false,
  animals: [],
  loading: false,
  error: null,
};

// 보호 동물 데이터 비동기 조회 Thunk
export const fetchShelterAnimals = createAsyncThunk(
  'shelter/fetchShelterAnimals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/shelter-animals');
      return response.data as Animal[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || '동물 데이터를 불러오는데 실패했습니다.');
    }
  }
);

export const shelterSlice = createSlice({
  name: 'shelter',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    toggleAlert: (state) => {
      state.isAlertOn = !state.isAlertOn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShelterAnimals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShelterAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.animals = action.payload;
      })
      .addCase(fetchShelterAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveTab, toggleAlert } = shelterSlice.actions;
export default shelterSlice.reducer;