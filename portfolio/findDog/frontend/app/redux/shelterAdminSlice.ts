// src/redux/shelterAdminSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;

interface ShelterFormState {
  status: 'ACTIVE' | 'COMPLETED';
  gender: 'UNKNOWN' | 'MALE' | 'FEMALE';
  breed: string;
  noticeNo: string;
  regDate: string;
  rescueLocation: string;
  imageUrl: string;
  content: string;
}

interface ShelterAdminState {
  imageInputType: 'LINK' | 'UPLOAD';
  formData: ShelterFormState;
  isLoading: boolean;
  error: string | null;
}

const initialState: ShelterAdminState = {
  imageInputType: 'LINK',
  formData: {
    status: 'ACTIVE',
    gender: 'UNKNOWN',
    breed: '',
    noticeNo: '',
    regDate: '',
    rescueLocation: '',
    imageUrl: '',
    content: '',
  },
  isLoading: false,
  error: null,
};

// 보호 동물 등록 비동기 Thunk (FormData 전송)
export const submitShelterAnimal = createAsyncThunk(
  'shelterAdmin/submitShelterAnimal',
  async ({ formData, imageFile }: { formData: ShelterFormState; imageFile: File | null }, { rejectWithValue }) => {
    try {
      const endpoint = 'http://localhost:8080/api/shelter-animals';
      const submitData = new FormData();

      // 텍스트 필드 추가
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          submitData.append(key, value);
        }
      });

      // 파일이 존재하면 추가
      if (imageFile) {
        submitData.append('imageFile', imageFile);
      }

      const response = await axios.post(endpoint, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data || '보호 동물이 성공적으로 등록되었습니다.';
    } catch (error: any) {
      console.error('등록에러: ', error);
      return rejectWithValue(error.response?.data || '서버 오류가 발생했습니다. 잠시후 다시 시도해 주세요');
    }
  }
);

export const shelterAdminSlice = createSlice({
  name: 'shelterAdmin',
  initialState,
  reducers: {
    setImageInputType: (state, action: PayloadAction<'LINK' | 'UPLOAD'>) => {
      state.imageInputType = action.payload;
    },
    updateShelterField: (state, action: PayloadAction<{ name: keyof ShelterFormState; value: string }>) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    resetShelterForm: (state) => {
      state.formData = {
        status: 'ACTIVE',
        gender: 'UNKNOWN',
        breed: '',
        noticeNo: '',
        regDate: '',
        rescueLocation: '',
        imageUrl: '',
        content: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitShelterAnimal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitShelterAnimal.fulfilled, (state) => {
        state.isLoading = false;
        state.formData = {
          status: 'ACTIVE',
          gender: 'UNKNOWN',
          breed: '',
          noticeNo: '',
          regDate: '',
          rescueLocation: '',
          imageUrl: '',
          content: '',
        };
      })
      .addCase(submitShelterAnimal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setImageInputType, updateShelterField, resetShelterForm } = shelterAdminSlice.actions;
export default shelterAdminSlice.reducer;