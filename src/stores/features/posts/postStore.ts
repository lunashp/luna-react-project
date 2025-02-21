import { action, makeAutoObservable, runInAction } from "mobx";
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
  // 페이지네이션 추가
  currentPage: number = 1;
  postsPerPage: number = 5;

  //   constructor() {
  //     makeAutoObservable(this);
  //   }

  constructor() {
    makeAutoObservable(this, {
      setPage: action.bound, // ✅ action으로 감싸기
    });
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

  // 페이지 변경
  setPage(page: number) {
    this.currentPage = page;
  }

  // 날짜 내림차순으로 정렬된 게시글 목록
  get sortedPosts() {
    return [...this.posts].sort(
      (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
    );
  }

  // 정렬된 게시글에서 페이지네이션 적용
  //   get paginatedPosts() {
  //     const startIndex = (this.currentPage - 1) * this.postsPerPage;
  //     const endIndex = startIndex + this.postsPerPage;
  //     return this.sortedPosts.slice(startIndex, endIndex);
  //   }

  // 총 페이지 수 계산
  get totalPages() {
    return Math.ceil(this.sortedPosts.length / this.postsPerPage);
  }

  //   get totalPages() {
  //     return Math.ceil(this.posts.length / this.postsPerPage);
  //   }

  get paginatedPosts() {
    const startIdx = (this.currentPage - 1) * this.postsPerPage;
    return this.sortedPosts.slice(startIdx, startIdx + this.postsPerPage);
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

      return newPost;
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
