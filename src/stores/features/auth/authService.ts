// import { firebaseAuth } from "../../../config/FirebaseConfig";
// import { login } from "./authSlice";

// export const fetchUserFromFirebase = async (dispatch: any) => {
//   const user = firebaseAuth.currentUser;

//   if (user) {
//     // Redux에 로그인 상태 업데이트
//     dispatch(
//       login({
//         uid: user.uid,
//         email: user.email!,
//         displayName: user.displayName || "",
//       })
//     );
//   }
// };

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { firebaseAuth, provider } from "../../../config/FirebaseConfig";

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

// export const googleLogin = async () => {
//   try {
//     const userCredential = await signInWithPopup(firebaseAuth, provider);
//     const user = userCredential.user;

//     console.log("구글 로그인 성공", user);
//     return user; // 로그인한 사용자 정보 반환

//     // dispatch(login({ uid: user?.uid, email: user?.email! }));
//   } catch (error) {
//     console.log("구글 로그인 실패", error);
//   }
// };

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
