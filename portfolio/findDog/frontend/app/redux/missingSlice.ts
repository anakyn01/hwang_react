// src/redux/missingSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface MissingAnimal {
  id: number;
  breed: string;
  status: string;
  gender: string;
  age?: string;
  weight?: string;
  rescueLocation: string;
  createdAt: string;
  mediaUrls?: string[];
}

interface MissingState {
  animalList: MissingAnimal[];
  loading: boolean;
  error: string | null;
}

const initialState: MissingState = {
  animalList: [],
  loading: true,
  error: null,
};

// 실종/제보 데이터 비동기 조회 Thunk
export const fetchMissingAnimals = createAsyncThunk(
  'missing/fetchMissingAnimals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/missing-posts', {
        withCredentials: true,
      });
      return response.data as MissingAnimal[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || '실종/제보 데이터를 불러오는데 실패했습니다.');
    }
  }
);

export const missingSlice = createSlice({
  name: 'missing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissingAnimals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMissingAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.animalList = action.payload;
      })
      .addCase(fetchMissingAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default missingSlice.reducer;