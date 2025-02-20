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

import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { firebaseAuth } from "../../../config/FirebaseConfig";

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

export const logout = async (): Promise<void> => {
  await signOut(firebaseAuth);
};
