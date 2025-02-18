import React from "react";
import { firebaseAuth } from "../../config/FirebaseConfig";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../stores/hooks/storeHooks";
import { login } from "../../features/auth/authSlice";
import AuthForm from "./AuthForm";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (email: string, password: string) => {
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
      alert("회원가입 성공");
      navigate(`/post`);
    } catch (error) {
      console.log("회원가입 오류", error);
    }
  };

  return (
    <AuthForm
      onSubmit={handleSignUp}
      buttonText="회원가입"
      goToAnother={() => navigate("/login")}
      anotherText="로그인"
    />
  );
};

export default SignUp;
