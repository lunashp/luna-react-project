import React from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks/storeHooks";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../config/FirebaseConfig";
import { logout } from "../features/auth/authSlice";
import { styled } from "@mui/material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { themeColors } from "../theme/Theme";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { AccountCircle } from "@mui/icons-material";

// 헤더 스타일 정의
const StyledAppBar = styled(AppBar)({
  backgroundColor: themeColors.primary,
  boxShadow: "none",
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 16px",
});

/**
 * Header Component
 * todo: 유저가 로그인 한 상태에서 로그인 페이지에 접근하지 못하도록 막기
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
    <StyledAppBar position="static">
      {user ? (
        <StyledToolbar>
          <IconButton onClick={handleLogout}>
            <LogoutOutlinedIcon
              style={{ color: themeColors.secondary, fontSize: "2rem" }}
            />
          </IconButton>

          <IconButton onClick={handleGoToProfile}>
            <AccountCircle
              style={{ color: themeColors.secondary, fontSize: "2rem" }}
            />
          </IconButton>
        </StyledToolbar>
      ) : (
        <StyledToolbar />
      )}
    </StyledAppBar>
  );
};
export default Header;
