import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./stores/hooks/storeHooks";
// import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import UserProfile from "./pages/user/UserProfile";
import PostList from "./pages/post/PostList";
import PostDetail from "./pages/post/PostDetail";
import PostUpdate from "./pages/post/PostUpdate";
import PostCreate from "./pages/post/PostCreate";

function App() {
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = user === undefined;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("user", user);

  // todo: user 가 없을 때 login 으로 리다이렉트 하는 다른 방법 생각 필요 > 라우팅 로직이 너무 지저분함
  return (
    <Routes>
      {/* <Route path="" element={<Navigate to={"/main"} />} /> */}
      <Route
        path=""
        element={user ? <Navigate to="/post" /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<SignUp />} />
      <Route
        path="/profile/:uid"
        element={user ? <UserProfile /> : <Navigate to="/login" />}
      />
      <Route
        path="/post"
        element={user ? <PostList /> : <Navigate to="/login" />}
      />
      <Route
        path="/post/create"
        element={user ? <PostCreate /> : <Navigate to="/login" />}
      />
      <Route
        path="/post/:id"
        element={user ? <PostDetail /> : <Navigate to="/login" />}
      />
      <Route
        path="/post/:id/update"
        element={user ? <PostUpdate /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
