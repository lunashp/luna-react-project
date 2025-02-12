import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: string;
  title: string;
  content: string;
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

/**
 * Posts Slice 생성
 */
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;
