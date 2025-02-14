import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { uid?: string; email?: string; displayName?: string } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

/**
 * Auth Slice 생성
 */
// todo: register, login action 분리 고민
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // todo: login 이 회원가입, 로그인, 정보 불러오기 등 다양한 기능을 포함하고 있음 -> 분리 고민
    login: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string;
        displayName?: string;
      }>
    ) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateProfileAction: (
      state,
      action: PayloadAction<{ displayName: string }>
    ) => {
      if (state.user) {
        state.user.displayName = action.payload.displayName;
      }
    },
  },
});

export const { login, logout, updateProfileAction } = authSlice.actions;
export default authSlice.reducer;
