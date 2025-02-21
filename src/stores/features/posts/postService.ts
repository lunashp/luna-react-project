import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, firebaseAuth } from "../../../config/FirebaseConfig";

export interface Post {
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

// 전체 게시글 불러오기
export const fetchPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];
  } catch (error) {
    console.log("게시글 불러오기 실패", error);
    throw new Error("게시글 불러오기 실패");
  }
};

// 새 게시글 추가
export const addPost = async (
  post: Omit<Post, "id" | "authorId" | "authorDisplayName">
) => {
  try {
    const user = firebaseAuth.currentUser;
    if (!user) throw new Error("로그인이 필요합니다.");

    const newPost = {
      ...post,
      authorId: user.uid,
      authorDisplayName: user.displayName || "익명",
      date: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "posts"), newPost);
    return { id: docRef.id, ...newPost };
  } catch (error) {
    console.log("글 작성 실패", error);
    throw new Error("글 작성에 실패했습니다."); // 에러 발생 시 에러 메시지 반환
  }
};

// 게시글 수정
export const updatePost = async (updatedPost: Post) => {
  try {
    const postRef = doc(db, "posts", updatedPost.id);
    await updateDoc(postRef, {
      title: updatedPost.title,
      content: updatedPost.content,
    });
    return updatedPost;
  } catch (error) {
    console.log("게시글 수정 실패", error);
    throw new Error("게시글 수정에 실패했습니다."); // 에러 발생 시 에러 메시지 반환
  }
};

// 게시글 삭제
export const deletePost = async (postId: string) => {
  try {
    await deleteDoc(doc(db, "posts", postId));
    return postId;
  } catch (error) {
    console.log("게시글 삭제 실패", error);
    throw new Error("게시글 삭제에 실패했습니다."); // 에러 발생 시 에러 메시지 반환
  }
};
// class PostService {
//   // 전체 게시글 불러오기
//   async fetchPosts() {
//     const querySnapshot = await getDocs(collection(db, "posts"));
//     return querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as Post[];
//   }

//   // 새 게시글 추가
//   async addPost(post: Omit<Post, "id" | "authorId" | "authorDisplayName">) {
//     const user = firebaseAuth.currentUser;
//     if (!user) throw new Error("로그인이 필요합니다.");

//     const newPost = {
//       ...post,
//       authorId: user.uid,
//       authorDisplayName: user.displayName || "익명",
//       date: new Date().toISOString(),
//     };

//     const docRef = await addDoc(collection(db, "posts"), newPost);
//     return { id: docRef.id, ...newPost };
//   }

//   // 게시글 수정
//   async updatePost(updatedPost: Post) {
//     const postRef = doc(db, "posts", updatedPost.id);
//     await updateDoc(postRef, {
//       title: updatedPost.title,
//       content: updatedPost.content,
//     });
//     return updatedPost;
//   }

//   // 게시글 삭제
//   async deletePost(postId: string) {
//     await deleteDoc(doc(db, "posts", postId));
//     return postId;
//   }
// }

// const postService = new PostService();
// export default postService;
