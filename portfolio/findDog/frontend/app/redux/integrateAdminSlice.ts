// src/redux/integrateAdminSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;

interface IntegrateFormState {
  title: string;
  content: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  imageUrl: string;
  videoUrl: string;
  attachmentUrl: string;
}

interface IntegrateAdminState {
  boardType: 'YOUTUBE' | 'FELLOW' | 'HELP';
  formData: IntegrateFormState;
  isLoading: boolean;
  error: string | null;
}

const initialState: IntegrateAdminState = {
  boardType: 'YOUTUBE',
  formData: {
    title: '',
    content: '',
    youtubeUrl: '',
    thumbnailUrl: '',
    imageUrl: '',
    videoUrl: '',
    attachmentUrl: '',
  },
  isLoading: false,
  error: null,
};

// 유튜브 ID 추출 함수 (shorts 포함)
const extractYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// 콘텐츠 등록 비동기 Thunk
export const submitIntegrateContent = createAsyncThunk(
  'integrateAdmin/submitContent',
  async ({ boardType, formData }: { boardType: 'YOUTUBE' | 'FELLOW' | 'HELP'; formData: IntegrateFormState }, { rejectWithValue }) => {
    try {
      let endpoint = '';
      let payload = {};

      if (boardType === 'YOUTUBE') {
        endpoint = 'http://localhost:8080/api/youtube';
        payload = {
          title: formData.title,
          youtubeUrl: formData.youtubeUrl,
          thumbnailUrl: formData.thumbnailUrl,
        };
      } else if (boardType === 'FELLOW') {
        endpoint = 'http://localhost:8080/api/fellow-news';
        payload = {
          title: formData.title,
          content: formData.content,
          imageUrl: formData.imageUrl,
          videoUrl: formData.videoUrl,
          attachmentUrl: formData.attachmentUrl,
        };
      } else if (boardType === 'HELP') {
        endpoint = 'http://localhost:8080/api/need-help';
        payload = {
          title: formData.title,
          content: formData.content,
          imageUrl: formData.imageUrl,
          videoUrl: formData.videoUrl,
          attachmentUrl: formData.attachmentUrl,
        };
      }

      const response = await axios.post(endpoint, payload);
      return response.data || '성공적으로 등록되었습니다';
    } catch (error: any) {
      console.error('등록에러 :', error);
      return rejectWithValue(error.response?.data || '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }
);

export const integrateAdminSlice = createSlice({
  name: 'integrateAdmin',
  initialState,
  reducers: {
    setBoardType: (state, action: PayloadAction<'YOUTUBE' | 'FELLOW' | 'HELP'>) => {
      state.boardType = action.payload;
      state.formData = {
        title: '',
        content: '',
        youtubeUrl: '',
        thumbnailUrl: '',
        imageUrl: '',
        videoUrl: '',
        attachmentUrl: '',
      };
    },
    updateIntegrateField: (state, action: PayloadAction<{ name: keyof IntegrateFormState; value: string }>) => {
      const { name, value } = action.payload;
      state.formData[name] = value;

      if (state.boardType === 'YOUTUBE' && name === 'youtubeUrl') {
        const videoId = extractYoutubeId(value);
        if (videoId) {
          state.formData.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
      }
    },
    resetIntegrateForm: (state) => {
      state.formData = {
        title: '',
        content: '',
        youtubeUrl: '',
        thumbnailUrl: '',
        imageUrl: '',
        videoUrl: '',
        attachmentUrl: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitIntegrateContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitIntegrateContent.fulfilled, (state) => {
        state.isLoading = false;
        state.formData = {
          title: '',
          content: '',
          youtubeUrl: '',
          thumbnailUrl: '',
          imageUrl: '',
          videoUrl: '',
          attachmentUrl: '',
        };
      })
      .addCase(submitIntegrateContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setBoardType, updateIntegrateField, resetIntegrateForm } = integrateAdminSlice.actions;
export default integrateAdminSlice.reducer;