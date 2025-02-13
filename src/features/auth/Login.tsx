import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/storeHooks";
import { login, logout } from "./authSlice";
import { firebaseAuth } from "../../config/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";

const Login = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = () => {
  //   dispatch(
  //     login({ uid: "123", email: "user@example.com", password: "1234" })
  //   );
  // };

  // 회원가입 함수
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(
        login({ uid: user?.uid, email: user?.email!, password: password })
      );
      console.log("회원가입 성공", user);
    } catch (error) {
      console.log("회원가입 오류", error);
    }
  };

  // 이메일 로그인 함수
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(
        login({ uid: user?.uid, email: user?.email!, password: password })
      );
      console.log("로그인 성공", user);
    } catch (error) {
      console.log("로그인 오류", error);
    }
  };

  console.log("user", user);
  console.log("typeof login", typeof login);
  console.log();

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

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
      {user ? (
        <div>
          <p>로그인됨: {user.email}</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <h2>로그인 / 회원가입</h2>
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
          <button onClick={handleSignUp}>회원가입</button>
          <button onClick={handleLogin}>로그인</button>
          {/* <button onClick={handleGoogleLogin}>Google 로그인</button> */}
        </div>
      )}
    </div>
  );
};

export default Login;
