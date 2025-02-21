import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postStore from "../../stores/features/posts/postStore";
import { observer } from "mobx-react-lite";

const PostList = observer(() => {
  const posts = postStore.posts;
  const navigate = useNavigate();

  useEffect(() => {
    postStore.fetchPosts();
  }, []);

  // 날짜 내림차순 정렬 (최신 글이 먼저)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
  );

  // 게시글 삭제 함수
  // 임시
  const handleDeletePost = async (postId: string) => {
    await postStore.deletePost(postId);
    navigate("/post");
  };

  return (
    <div>
      <h1>게시판</h1>
      <button onClick={() => navigate("/post/create")}>새 게시글 작성</button>
      {sortedPosts.map((post) => (
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
          <button onClick={() => handleDeletePost(post.id!)}>삭제</button>
        </div>
      ))}
    </div>
  );
});

export default PostList;
