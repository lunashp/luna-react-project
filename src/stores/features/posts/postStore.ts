import { makeAutoObservable, runInAction } from "mobx";
import postService from "./postService";

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

class PostStore {
  posts: Post[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // 전체 게시글 불러오기
  async fetchPosts() {
    this.loading = true;
    this.error = null;
    try {
      const posts = await postService.fetchPosts(); // 서비스 호출
      runInAction(() => {
        this.posts = posts;
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  // 새 게시글 추가
  async addPost(post: Omit<Post, "id" | "authorId" | "authorDisplayName">) {
    this.loading = true;
    this.error = null;
    try {
      const newPost = await postService.addPost(post); // 서비스 호출
      runInAction(() => {
        this.posts.push(newPost);
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  // 게시글 수정
  async updatePost(updatedPost: Post) {
    this.loading = true;
    this.error = null;
    try {
      const updated = await postService.updatePost(updatedPost); // 서비스 호출
      runInAction(() => {
        const index = this.posts.findIndex((post) => post.id === updated.id);
        if (index !== -1) {
          this.posts[index] = updated;
        }
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  // 게시글 삭제
  async deletePost(postId: string) {
    this.loading = true;
    this.error = null;
    try {
      await postService.deletePost(postId); // 서비스 호출
      runInAction(() => {
        this.posts = this.posts.filter((post) => post.id !== postId);
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const postStore = new PostStore();
export default postStore;
