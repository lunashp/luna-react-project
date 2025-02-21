import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, firebaseAuth } from "../../../config/FirebaseConfig";
import { Post } from "./postStore";

class PostService {
  // 전체 게시글 불러오기
  async fetchPosts() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];
  }

  // 새 게시글 추가
  async addPost(post: Omit<Post, "id" | "authorId" | "authorDisplayName">) {
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
  }

  // 게시글 수정
  async updatePost(updatedPost: Post) {
    const postRef = doc(db, "posts", updatedPost.id);
    await updateDoc(postRef, {
      title: updatedPost.title,
      content: updatedPost.content,
    });
    return updatedPost;
  }

  // 게시글 삭제
  async deletePost(postId: string) {
    await deleteDoc(doc(db, "posts", postId));
    return postId;
  }
}

const postService = new PostService();
export default postService;
