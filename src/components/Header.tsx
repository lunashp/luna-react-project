import React from "react";
// import { useAppDispatch, useAppSelector } from "../stores/hooks/storeHooks";
import { useNavigate } from "react-router-dom";
// import { firebaseAuth } from "../config/FirebaseConfig";
import { styled } from "@mui/material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { themeColors } from "../theme/Theme";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { AccountCircle } from "@mui/icons-material";
// import { logout } from "../stores/features/auth/authSlice";
import authStore from "../stores/features/auth/authStore";
import { observer } from "mobx-react-lite";

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
const Header = observer(() => {
  // const dispatch = useAppDispatch();
  // const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const isUser = authStore.isAuthenticated;

  const user = authStore.user;
  console.log("user", user);

  const test = authStore;
  console.log("test", test);

  //프로필로 이동
  const handleGoToProfile = () => {
    navigate(`/profile/${user?.uid}`);
  };

  // 로그아웃 함수
  const handleLogout = async () => {
    authStore.logout();
  };

  return (
    <StyledAppBar position="static">
      {isUser ? (
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
});
export default Header;
