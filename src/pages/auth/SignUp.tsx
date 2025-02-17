import React, { useState } from "react";
import { firebaseAuth } from "../../config/FirebaseConfig";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../stores/hooks/storeHooks";
import { login } from "../../features/auth/authSlice";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(
        login({
          uid: user?.uid,
          email: user?.email!,
        })
      );
      console.log("회원가입 성공", user);
      navigate(`/post`);
    } catch (error) {
      console.log("회원가입 오류", error);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
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
    </div>
  );
};

export default SignUp;
