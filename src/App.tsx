import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks/storeHooks";
import Auth from "./features/auth/Auth";
import UserProfile from "./features/user/UserProfile";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/SignUp";

function App() {
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = user === undefined;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("user", user);

  return (
    <Routes>
      <Route path="" element={<Navigate to={"/main"} />} />
      <Route path="/main" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<SignUp />} />
      <Route
        path="/profile/:uid"
        element={user ? <UserProfile /> : <Navigate to="/login" />}
      />
      {/* 다른 경로들 추가 예정 */}
    </Routes>
  );
}

export default App;
