import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../config/FirebaseConfig";
import { useAppDispatch, useAppSelector } from "../../stores/hooks/storeHooks";
import { fetchPosts } from "../../features/posts/postSlice";

const PostList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const navigate = useNavigate();
  const currentUser = firebaseAuth.currentUser; // 현재 로그인한 사용자

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>게시판</h1>
      <button onClick={() => navigate("/post/create")}>새 게시글 작성</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3 onClick={() => navigate(`/post/${post.id}`)}>{post.title}</h3>
            <p>작성자: {post.authorEmail}</p>
            {currentUser?.uid === post.authorId && (
              // <button onClick={() => dispatch(deletePost(post.id))}>삭제</button>
              <button>삭제</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
