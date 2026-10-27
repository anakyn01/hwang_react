// src/redux/signupSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface SignupState {
  step: number;
  formData: {
    agreeTerms: boolean;
    agreePrivacy: boolean;
    agreeAge: boolean;
    marketingAgreed: boolean;
    email: string;
    nickname: string;
    password: string;
    passwordConfirm: string;
    name: string;
    phone: string;
    address: string;
    detailAddress: string;
    userType: 'GENERAL' | 'BUSINESS';
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: SignupState = {
  step: 0,
  formData: {
    agreeTerms: false,
    agreePrivacy: false,
    agreeAge: false,
    marketingAgreed: false,
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    address: '',
    detailAddress: '',
    userType: 'GENERAL',
  },
  isLoading: false,
  error: null,
};

// 회원가입 비동기 Thunk
export const submitSignup = createAsyncThunk(
  'signup/submitSignup',
  async ({ formData, profileFile }: { formData: SignupState['formData']; profileFile: File | null }, { rejectWithValue }) => {
    try {
      let finalImageUrl = '';

      // 1. 프로필 사진이 있으면 먼저 업로드
      if (profileFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', profileFile);

        const uploadRes = await fetch('http://localhost:8080/api/members/upload-profile', {
          method: 'POST',
          body: imageFormData,
        });

        if (!uploadRes.ok) {
          throw new Error('이미지 업로드에 실패했습니다.');
        }
        finalImageUrl = await uploadRes.text();
      }

      const fullAddressToSend = formData.detailAddress
        ? `${formData.address} ${formData.detailAddress}`
        : formData.address;

      // 2. 회원가입 요청 전송
      const res = await fetch('http://localhost:8080/api/members/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          nickname: formData.nickname,
          password: formData.password,
          marketingAgreed: formData.marketingAgreed,
          provider: 'LOCAL',
          profileImageUrl: finalImageUrl,
          name: formData.name,
          phone: formData.phone,
          address: fullAddressToSend,
          userType: formData.userType,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || '회원가입에 실패했습니다.');
      }

      return true;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateFormField: (state, action: PayloadAction<{ field: keyof SignupState['formData']; value: any }>) => {
      state.formData[action.payload.field] = action.payload.value;
    },
    setAllAgreed: (state, action: PayloadAction<boolean>) => {
      const isChecked = action.payload;
      state.formData.agreeTerms = isChecked;
      state.formData.agreePrivacy = isChecked;
      state.formData.agreeAge = isChecked;
      state.formData.marketingAgreed = isChecked;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSignup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitSignup.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(submitSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setStep, updateFormField, setAllAgreed } = signupSlice.actions;
export default signupSlice.reducer;