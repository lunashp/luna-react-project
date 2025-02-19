import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, firebaseAuth } from "../../config/FirebaseConfig";

// type Post =  {
//   id: string;
//   title: string;
//   content: string;
//   authorId?: string; // 작성자 UID
//   // authorEmail: string; // 작성자 이메일
//   authorDisplayName?: string; // 작성자 닉네임
//   date?: string; // 작성일
//   file?: string | null
//   fileName?: string | null
// }

//todo: post, file 데이터 분리
interface Post {
  id: string;
  title: string;
  content: string;
  authorId?: string; // 작성자 UID
  // authorEmail: string; // 작성자 이메일
  authorDisplayName?: string; // 작성자 닉네임
  date?: string; // 작성일
  file?: string | null;
  fileName?: string | null;
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

// Firebase에서 전체 게시글 가져오기
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];
});

//Firebase에 새 게시글 추가
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post: Omit<Post, "id" | "authorId" | "authorDisplayName">) => {
    const user = firebaseAuth.currentUser;
    if (!user) throw new Error("로그인이 필요합니다.");

    const newPost = {
      ...post,
      authorId: user.uid,
      authorDisplayName: user.displayName || "익명",
      date: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "posts"), newPost);

    // const uploadFIleName
    return { id: docRef.id, ...newPost };
  }
);

// Firebase에서 게시글 수정
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: Post) => {
    const postRef = doc(db, "posts", post.id);
    await updateDoc(postRef, { title: post.title, content: post.content });
    return post;
  }
);

// Firebase에서 게시글 삭제
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: string) => {
    await deleteDoc(doc(db, "posts", postId));
    return postId;
  }
);

// Redux Slice
// todo: reducer 에 fullfilled, pending, rejected 추가 고려
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) state.posts[index] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
