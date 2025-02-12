import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/storeHooks";
import { login, logout } from "./authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogin = () => {
    dispatch(login({ uid: "123", email: "user@example.com" }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {user ? (
        <div>
          <p>로그인됨: {user.email}</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <button onClick={handleLogin}>로그인</button>
      )}
    </div>
  );
};

export default Login;
