// src/redux/campaignAdminSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;

interface CampaignFormState {
  hashtag: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  mediaType: string;
  mediaUrl: string;
}

interface CampaignAdminState {
  formData: CampaignFormState;
  isLoading: boolean;
  error: string | null;
}

const initialState: CampaignAdminState = {
  formData: {
    hashtag: '',
    title: '',
    content: '',
    thumbnailUrl: '',
    mediaType: 'IMAGE',
    mediaUrl: '',
  },
  isLoading: false,
  error: null,
};

// 유튜브 ID 추출 유틸 함수
const extractYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// 캠페인 등록 비동기 Thunk
export const submitCampaign = createAsyncThunk(
  'campaignAdmin/submitCampaign',
  async (formData: CampaignFormState, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/campaigns', formData);
      return response.data.message || '입양 캠페인이 성공적으로 등록되었습니다!';
    } catch (error: any) {
      console.error('등록에러:', error);
      if (error.response?.status === 401) {
        return rejectWithValue('등록 권한이 없습니다. 관리자로 로그인 해주세요');
      }
      return rejectWithValue('서버 오류가 발생했습니다. 잠시후 다시 시도해 주세요');
    }
  }
);

export const campaignAdminSlice = createSlice({
  name: 'campaignAdmin',
  initialState,
  reducers: {
    updateCampaignField: (
      state, 
      action: PayloadAction<{ name: keyof CampaignFormState; value: string }>
    ) => {
      const { name, value } = action.payload;
      state.formData[name] = value;

      // 만약 입력한 필드가 'mediaUrl'이고 현재 'YOUTUBE' 모드라면 썸네일 자동 생성
      if (name === 'mediaUrl' && state.formData.mediaType === 'YOUTUBE') {
        const videoId = extractYoutubeId(value);
        if (videoId) {
          state.formData.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
      }
    },
    setMediaType: (state, action: PayloadAction<string>) => {
      state.formData.mediaType = action.payload;
      state.formData.mediaUrl = ''; // 타입 변경 시 기존 주소 초기화
    },
    resetCampaignForm: (state) => {
      state.formData = {
        hashtag: '',
        title: '',
        content: '',
        thumbnailUrl: '',
        mediaType: 'IMAGE',
        mediaUrl: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCampaign.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitCampaign.fulfilled, (state) => {
        state.isLoading = false;
        state.formData = {
          hashtag: '',
          title: '',
          content: '',
          thumbnailUrl: '',
          mediaType: 'IMAGE',
          mediaUrl: '',
        };
      })
      .addCase(submitCampaign.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateCampaignField, setMediaType, resetCampaignForm } = campaignAdminSlice.actions;
export default campaignAdminSlice.reducer;