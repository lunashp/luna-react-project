import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import UserProfile from "./pages/user/UserProfile";
import PostList from "./pages/post/PostList";
import PostDetail from "./pages/post/PostDetail";
// import PostUpdate from "./pages/post/PostUpdate";
import PostCreate from "./pages/post/PostCreate";
// import { useAppSelector } from "./stores/hooks/storeHooks";
import authStore from "./stores/features/auth/authStore";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const isUser = authStore.isAuthenticated;

  // const user = useAppSelector((state) => state.auth.user);
  const isLoading = isUser === undefined;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("isUser", isUser);

  // todo: user 가 없을 때 login 으로 리다이렉트 하는 다른 방법 생각 필요 > 라우팅 로직이 너무 지저분함
  return (
    <Routes>
      {/* <Route path="" element={<Navigate to={"/main"} />} /> */}
      <Route
        path=""
        element={isUser ? <Navigate to="/post" /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<SignUp />} />
      <Route
        path="/profile/:uid"
        element={isUser ? <UserProfile /> : <Navigate to="/login" />}
      />
      <Route
        path="/post"
        element={isUser ? <PostList /> : <Navigate to="/login" />}
      />

      <Route
        path="/post/create"
        element={isUser ? <PostCreate /> : <Navigate to="/login" />}
      />
      <Route
        path="/post/:id"
        element={isUser ? <PostDetail /> : <Navigate to="/login" />}
      />
      {/* <Route
        path="/post/:id/update"
        element={isUser ? <PostUpdate /> : <Navigate to="/login" />}
      /> */}
    </Routes>
  );
});

export default App;
