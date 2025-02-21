import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import authStore from "../../stores/features/auth/authStore";

// todo: 로그인 한 사용자는 해당 페이지에 접근 하지 못하도록 막아야 함
const Login = () => {
  const navigate = useNavigate();

  // 로그인 함수
  const handleLogin = async (email: string, password: string) => {
    await authStore.login(email, password);
    navigate("/post");
  };

  // 구글 로그인 함수
  const handleGoogleLogin = async () => {
    await authStore.googleLogin();
    navigate("/post");
  };

  return (
    <AuthForm
      onSubmit={handleLogin}
      buttonText="로그인"
      onGoogleClick={handleGoogleLogin}
      goToAnother={() => navigate("/join")}
      anotherText="회원가입"
    />
  );
};

export default Login;
