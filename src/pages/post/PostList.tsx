import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks/storeHooks";
import { fetchPosts } from "../../features/posts/postSlice";

const PostList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const navigate = useNavigate();

  // todo: useSelector 로 loading 상태 추가

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>게시판</h1>
      <button onClick={() => navigate("/post/create")}>새 게시글 작성</button>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h3
            onClick={() => navigate(`/post/${post.id}`)}
            style={{ cursor: "pointer" }}
          >
            {post.title}
          </h3>
          <p>{post.content}</p>
          <p>작성일: {new Date(post.date!).toLocaleString()}</p>{" "}
        </div>
      ))}
    </div>
  );
};

export default PostList;
