import React from "react";
import { firebaseAuth, provider } from "../../config/FirebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../stores/hooks/storeHooks";
import { login } from "../../features/auth/authSlice";

import AuthForm from "./AuthForm";

// todo: 로그인 한 사용자는 해당 페이지에 접근 하지 못하도록 막아야 함
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 로그인 함수
  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      const user = userCredential.user;

      dispatch(login({ uid: user.uid, email: user.email! }));

      navigate("/post");
    } catch (error) {
      console.error("로그인 오류", error);
    }
  };

  // 구글 로그인 함수
  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(firebaseAuth, provider);
      const user = userCredential.user;

      dispatch(login({ uid: user?.uid, email: user?.email! }));
      console.log("구글 로그인 성공", user);
    } catch (error) {
      console.log("구글 로그인 실패", error);
    }
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
