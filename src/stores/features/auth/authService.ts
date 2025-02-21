import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { firebaseAuth, provider } from "../../../config/FirebaseConfig";

export const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    console.log("회원가입 실패", error);
    throw new Error("회원가입 실패");
  }
};

export const login = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const googleLogin = async () => {
  try {
    const userCredential = await signInWithPopup(firebaseAuth, provider);
    const user = userCredential.user;

    console.log("구글 로그인 성공", user);
    return user; // 로그인한 사용자 정보 반환
  } catch (error) {
    console.log("구글 로그인 실패", error);
    throw new Error("구글 로그인에 실패했습니다."); // 에러 발생 시 에러 메시지 반환
  }
};

export const logout = async (): Promise<void> => {
  await signOut(firebaseAuth);
};
