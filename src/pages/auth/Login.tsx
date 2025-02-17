import React, { useState } from "react";
import { firebaseAuth, provider } from "../../config/FirebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../stores/hooks/storeHooks";
import { login } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 이메일 로그인 함수
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(login({ uid: user?.uid, email: user?.email! }));

      navigate("/post");
      console.log("로그인 성공", user);
    } catch (error) {
      console.log("로그인 오류", error);
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

  // 회원가입 페이지로 이동
  const handleGoToSignUp = () => {
    navigate(`/join`);
  };

  return (
    <div>
      <h2>로그인</h2>
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleGoogleLogin}>Google 로그인</button>
      <p>
        <button onClick={handleGoToSignUp}>회원가입</button>
      </p>
    </div>
  );
};

export default Login;
