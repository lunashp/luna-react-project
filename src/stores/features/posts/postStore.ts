import { makeAutoObservable, runInAction } from "mobx";
import {
  addPost,
  deletePost,
  fetchPosts,
  Post,
  updatePost,
} from "./postService";

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
      const posts = await fetchPosts(); // 서비스 호출
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
      const newPost = await addPost(post); // 서비스 호출
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
      const updated = await updatePost(updatedPost); // 서비스 호출
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
      await deletePost(postId); // 서비스 호출
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
