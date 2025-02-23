import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postStore from "../../stores/features/posts/postStore";
import { observer } from "mobx-react-lite";
import { Grid2, Pagination, styled, Typography } from "@mui/material";
import { BoardButton } from "../../components/Button";

const Box = styled("div")`
  margin-top: 30px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const BoardBox = styled("div")`
  border: 1px solid #a67c52;
  background-color: #fffef9;
  padding: 15px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 12px;
`;

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
    <Box>
      <Grid2 container gap={6} justifyContent={"space-between"}>
        <Typography variant="h4">Board</Typography>
        <BoardButton onClick={() => navigate("/post/create")}>
          새 게시글 작성
        </BoardButton>
      </Grid2>
      {paginatedPosts.map((post) => (
        <BoardBox key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
          <Typography variant="h6">{post.title}</Typography>
          <p>{post.content}</p>
          <p>작성일: {new Date(post.date!).toLocaleString()}</p>
          <button
            onClick={(e) => {
              e.stopPropagation(); // 부모 클릭 방지
              handleDeletePost(post.id);
            }}
          >
            삭제
          </button>
        </BoardBox>
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
    </Box>
  );
});

export default PostList;
