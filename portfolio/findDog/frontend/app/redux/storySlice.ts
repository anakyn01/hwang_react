// src/redux/storySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface StoryPost {
  id: number;
  category: string;
  author: string;
  timeAgo: string;
  title: string;
  content: string;
  images: string[];
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  isPick?: boolean;
}

interface StoryState {
  activeTab: string;
  subTab: string;
  isAlertOn: boolean;
  storyList: StoryPost[];
  loading: boolean;
  error: string | null;
}

const initialState: StoryState = {
  activeTab: '입양이야기',
  subTab: '전체',
  isAlertOn: false,
  storyList: [],
  loading: true,
  error: null,
};

// 스토리 데이터를 가져오는 비동기 Thunk
export const fetchStories = createAsyncThunk(
  'story/fetchStories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/stories');
      return response.data as StoryPost[];
    } catch (error: any) {
      // API 실패 시 테스트용 더미 데이터를 반환하거나 에러 처리
      return rejectWithValue(error.response?.data || '스토리 데이터를 불러오는데 실패했습니다.');
    }
  }
);

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setSubTab: (state, action: PayloadAction<string>) => {
      state.subTab = action.payload;
    },
    toggleAlert: (state) => {
      state.isAlertOn = !state.isAlertOn;
    },
    // API 에러 발생 시 임시 더미 데이터를 넣어주는 액션
    setDummyStories: (state, action: PayloadAction<StoryPost[]>) => {
      state.storyList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.storyList = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveTab, setSubTab, toggleAlert, setDummyStories } = storySlice.actions;
export default storySlice.reducer;