import { firebaseAuth } from "../../config/FirebaseConfig";
import { login } from "./authSlice";

export const fetchUserFromFirebase = async (dispatch: any) => {
  const user = firebaseAuth.currentUser;

  if (user) {
    // Redux에 로그인 상태 업데이트
    dispatch(
      login({
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || "",
      })
    );
  }
};
