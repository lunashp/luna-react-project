import { makeAutoObservable, runInAction } from "mobx";
import { fetchCurrentUser, updateDisplayName, UserType } from "./userService";

class UserStore {
  user: UserType | null = null;
  isAuthenticated: boolean = false;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCurrentUser() {
    this.loading = true;
    this.error = null;
    try {
      const user = await fetchCurrentUser();
      runInAction(() => {
        this.user = user;
        this.isAuthenticated = !!user;
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

  // 닉네임 업데이트 (추가된 로직)
  async updateDisplayName(newDisplayName: string) {
    this.loading = true;
    this.error = null;
    try {
      await updateDisplayName(newDisplayName);

      runInAction(() => {
        if (this.user) {
          this.user.displayName = newDisplayName;
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
}

const userStore = new UserStore();
export default userStore;
