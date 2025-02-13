import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { uid?: string; email?: string; password?: string } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

/**
 * Auth Slice 생성
 */
// todo: login 타입 확인 후 명시 필요
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ uid: string; email: string; password: string }>
    ) => {
      // login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
