import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import postReducer from "./features/posts/postSlice";

/**
 * Redux store 생성
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});

// Redux의 `RootState` 타입 & Dispatch 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
