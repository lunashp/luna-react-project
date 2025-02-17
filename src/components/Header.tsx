import React from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks/storeHooks";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../config/FirebaseConfig";
import { logout } from "../features/auth/authSlice";

/**
 * Header Component
 * todo: 회원가입, 로그인(로그아웃), 프로필 보기, 게시판으로 이동 버튼 추가
 *
 */
const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  console.log("user", user);

  //프로필로 이동
  const handleGoToProfile = () => {
    navigate(`/profile/${user?.uid}`);
  };

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
    <header>
      {user ? (
        <div>
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={handleGoToProfile}>프로필 보기</button>
        </div>
      ) : (
        ""
      )}
    </header>
  );
};
export default Header;
