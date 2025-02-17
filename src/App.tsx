import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./stores/hooks/storeHooks";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import UserProfile from "./pages/user/UserProfile";
import PostList from "./pages/post/PostList";
import PostCreate from "./pages/post/PostCeate";

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
      <Route path="/post" element={<PostList />} />
      <Route path="/post/create" element={<PostCreate />} />
      {/* 다른 경로들 추가 예정 */}
    </Routes>
  );
}

export default App;
