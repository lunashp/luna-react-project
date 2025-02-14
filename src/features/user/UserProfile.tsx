import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/storeHooks";
import { firebaseAuth } from "../../config/FirebaseConfig";
import { logout, updateProfileAction } from "../auth/authSlice";
import { updateProfile } from "@firebase/auth";
import { fetchUserFromFirebase } from "../auth/authService";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [displayName, setNewDisplayName] = useState("");

  // 앱 실행 시 로그인한 사용자 정보 가져오기
  useEffect(() => {
    fetchUserFromFirebase(dispatch);
  }, [dispatch]);

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

  // 프로필 업데이트 함수
  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      await updateProfile(firebaseAuth.currentUser!, {
        displayName: displayName,
      });

      dispatch(updateProfileAction({ displayName: displayName }));
      console.log("프로필 업데이트 성공", user);
    } catch (error) {
      console.log("프로필 업데이트 실패", error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user?.email}</p>
      <p>Nickname: {user?.displayName}</p>
      <input
        type="text"
        placeholder="닉네임 입력"
        value={displayName}
        onChange={(e) => setNewDisplayName(e.target.value)}
      />
      <button onClick={handleUpdateProfile}>이름 변경</button>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default UserProfile;
