import { makeAutoObservable, runInAction } from "mobx";
import { User } from "firebase/auth";
import { googleLogin, login, logout } from "./authService";

class AuthStore {
  isAuthenticated = false;
  user: User | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  //   async register(email: string, password: string) {
  //     this.loading = true;
  //     this.error = null;

  //     try {
  //       const user = await login(email, password);
  //       runInAction(() => {
  //         this.isAuthenticated = true;
  //         this.user = user;
  //       });
  //     } catch (error: any) {
  //       runInAction(() => {
  //         this.error = error.message;
  //       });
  //     } finally {
  //       runInAction(() => {
  //         this.loading = false;
  //       });
  //     }
  //   }

  // 로그인
  async login(email: string, password: string) {
    this.loading = true;
    this.error = null;

    try {
      const user = await login(email, password);
      runInAction(() => {
        this.isAuthenticated = true;
        this.user = user;
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

  // 구글 로그인
  async googleLogin() {
    this.loading = true;
    this.error = null;

    try {
      const user = await googleLogin();
      runInAction(() => {
        this.isAuthenticated = true;
        this.user = user;
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

  // 로그아웃
  async logout() {
    this.loading = true;
    try {
      await logout();
      runInAction(() => {
        this.isAuthenticated = false;
        this.user = null;
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

const authStore = new AuthStore();
export default authStore;
