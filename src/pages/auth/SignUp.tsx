import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import authStore from "../../stores/features/auth/authStore";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (email: string, password: string) => {
    await authStore.register(email, password);
    alert("회원가입 성공");
    navigate(`/login`);
  };

  return <AuthForm onSubmit={handleSignUp} buttonText="회원가입" />;
};

export default SignUp;
