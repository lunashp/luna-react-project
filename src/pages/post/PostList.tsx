import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postStore from "../../stores/features/posts/postStore";
import { observer } from "mobx-react-lite";
import { Pagination } from "@mui/material";
// import Pagination from "./Pagination";

const PostList = observer(() => {
  const navigate = useNavigate();
  const { paginatedPosts, currentPage, totalPages, setPage } = postStore;

  useEffect(() => {
    postStore.fetchPosts();
  }, []);

  // 게시글 삭제 함수
  // 임시
  const handleDeletePost = async (postId: string) => {
    await postStore.deletePost(postId);
    navigate("/post");
  };

  if (!postStore) {
    return <p>게시판 데이터를 불러오는 중...</p>;
  }

  return (
    <div>
      <h1>게시판</h1>
      <button onClick={() => navigate("/post/create")}>새 게시글 작성</button>
      {paginatedPosts.map((post) => (
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

      {/* 페이지네이션*/}
      <Pagination
        count={totalPages} // 총 페이지 수
        page={currentPage} // 현재 페이지
        onChange={(_, page) => setPage(page)} // 페이지 변경 시 상태 업데이트
        showFirstButton
        showLastButton
        sx={{ display: "flex", justifyContent: "center", mt: 2 }}
      />
    </div>
  );
});

export default PostList;
