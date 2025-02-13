import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/storeHooks";
import { firebaseAuth } from "../../config/FirebaseConfig";
import { logout } from "../auth/authSlice";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut();

      dispatch(logout());
      console.log("로그아웃 성공");
    } catch (error) {
      console.log("로그아웃 실패", error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default UserProfile;
