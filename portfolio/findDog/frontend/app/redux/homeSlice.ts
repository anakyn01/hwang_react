import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 타입 정의
export interface Animal {
  id: number;
  region: string;
  noticeNo: string;
  birthYear: string;
  gender: string;
  weight: number;
  imageUrl: string;
}

export interface Campaign {
  id: number;
  title: string;
  hashtag: string;
  content: string;
  thumbnailUrl: string;
  mediaType: string;
  mediaUrl: string;
}

export interface YoutubePost {
  id: number;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
}

export interface FellowNews {
  id: number;
  title: string;
  imageUrl: string;
}

export interface NeedHelp {
  id: number;
  imageUrl: string;
}

interface HomeState {
  animals: Animal[];
  isAnimalsLoading: boolean;
  
  campaigns: Campaign[];
  isCampaignsLoading: boolean;
  activeHashtag: string;

  youtubePosts: YoutubePost[];
  fellowNews: FellowNews[];
  needHelps: NeedHelp[];
  
  error: string | null;
}

const initialState: HomeState = {
  animals: [],
  isAnimalsLoading: false,
  campaigns: [],
  isCampaignsLoading: false,
  activeHashtag: '#제주입양',
  youtubePosts: [],
  fellowNews: [],
  needHelps: [],
  error: null,
};

// 1. 추천 동물 데이터 비동기 Thunk
export const fetchAnimals = createAsyncThunk('home/fetchAnimals', async () => {
  const res = await fetch('/api/animals/recommended');
  if (!res.ok) throw new Error('네트워크 응답이 정상이 아닙니다');
  return (await res.json()) as Animal[];
});

// 2. 캠페인 데이터 비동기 Thunk (해시태그 파라미터 전달)
export const fetchCampaigns = createAsyncThunk(
  'home/fetchCampaigns',
  async (hashtag: string) => {
    const res = await fetch(`/api/campaigns?hashtag=${encodeURIComponent(hashtag)}`);
    if (!res.ok) throw new Error('캠페인 네트워크 응답이 정상이 아닙니다');
    return (await res.json()) as Campaign[];
  }
);

// 3. 유튜브, 펠로우 소식, 도움이 필요해요 데이터 한번에 가져오기 (또는 각각 분리)
export const fetchHomeExtras = createAsyncThunk('home/fetchHomeExtras', async () => {
  const [youtubeRes, fellowRes, helpRes] = await Promise.all([
    fetch('/api/youtube').then((res) => res.json()),
    fetch('/api/fellow-news').then((res) => res.json()),
    fetch('/api/need-help').then((res) => res.json()),
  ]);

  return {
    youtubePosts: youtubeRes,
    fellowNews: fellowRes,
    needHelps: helpRes,
  };
});

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setActiveHashtag: (state, action) => {
      state.activeHashtag = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 추천 동물
    builder
      .addCase(fetchAnimals.pending, (state) => {
        state.isAnimalsLoading = true;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.isAnimalsLoading = false;
        state.animals = action.payload;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.isAnimalsLoading = false;
        state.error = action.error.message || '에러 발생';
      });

    // 캠페인
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.isCampaignsLoading = true;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.isCampaignsLoading = false;
        state.campaigns = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.isCampaignsLoading = false;
        state.error = action.error.message || '에러 발생';
      });

    // 기타 섹션 (유튜브, 펠로우, 도움이 필요해요)
    builder.addCase(fetchHomeExtras.fulfilled, (state, action) => {
      state.youtubePosts = action.payload.youtubePosts;
      state.fellowNews = action.payload.fellowNews;
      state.needHelps = action.payload.needHelps;
    });
  },
});

export const { setActiveHashtag } = homeSlice.actions;
export default homeSlice.reducer;