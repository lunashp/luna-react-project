import { firebaseAuth, db } from "../../../config/FirebaseConfig";
import { updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export type UserType = {
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
} | null;

export const fetchCurrentUser = async (): Promise<UserType | null> => {
  const user = firebaseAuth.currentUser;
  if (!user) return null;

  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};

    // Firestore에서 추가 정보 가져오기
    return {
      uid: user.uid,
      email: user.email!,
      displayName: userData.displayName || user.displayName || "익명",
    };
  } catch (error) {
    console.log("정보가져오기 실패", error);
    throw new Error("정보가져오기 실패");
  }
};

export const updateDisplayName = async (
  newDisplayName: string
): Promise<void> => {
  const user = firebaseAuth.currentUser;
  if (!user) throw new Error("로그인이 필요합니다.");

  // Firebase Authentication의 닉네임 업데이트
  await updateProfile(user, { displayName: newDisplayName });
};

// class UserService {
//   //  async fetchCurrentUser(): Promise<UserType | null> {

//   async fetchCurrentUser(): Promise<UserType | null> {
//     const user = firebaseAuth.currentUser;
//     if (!user) return null;

//     // Firestore에서 추가 정보 가져오기
//     const userDoc = await getDoc(doc(db, "users", user.uid));
//     const userData = userDoc.exists() ? userDoc.data() : {};

//     return {
//       uid: user.uid,
//       email: user.email!,
//       displayName: userData.displayName || user.displayName || "익명",
//     };
//   }

//   //  닉네임 업데이트
//   async updateDisplayName(newDisplayName: string): Promise<void> {
//     const user = firebaseAuth.currentUser;
//     if (!user) throw new Error("로그인이 필요합니다.");

//     // Firebase Authentication의 닉네임 업데이트
//     await updateProfile(user, { displayName: newDisplayName });

//     // Firestore의 사용자 정보 업데이트
//     const userRef = doc(db, "users", user.uid);
//     await updateDoc(userRef, { displayName: newDisplayName });
//   }
// }

// const userService = new UserService();
// export default userService;
