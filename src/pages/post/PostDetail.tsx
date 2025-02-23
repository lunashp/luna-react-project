import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFile from "../../hooks/useFile";
import postStore from "../../stores/features/posts/postStore";
import authStore from "../../stores/features/auth/authStore";
import styled from "styled-components";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { ThemeButton } from "../../components/Button";
import { CloudDownload } from "@mui/icons-material";

const Box = styled("div")`
  margin-top: 60px;
  text-align: center;
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleDownloadFile } = useFile();

  const posts = postStore.posts.find((post) => post.id === id);

  const userId = authStore.user?.uid;

  const handleGoToPostList = () => {
    navigate("/post");
  };

  const handleGoToUpdate = () => {
    // 수정 화면으로 이동 시 fileName과 storedFile을 state로 전달
    navigate(`/post/${id}/update`, {
      state: { fileName, storedFile }, // fileName과 storedFile을 state로 전달
    });
  };

  // localStorage에서 posts.id로 시작하는 키를 찾기
  const findFileInLocalStorage = () => {
    const allKeys = Object.keys(localStorage); // 모든 키 가져오기
    const matchingKeys = allKeys.filter((key) => key.startsWith(posts?.id!)); // posts.id로 시작하는 키들 필터링
    if (matchingKeys.length > 0) {
      return matchingKeys[0]; // 첫 번째 일치하는 키 반환
    }
    return null;
  };

  // posts.id로 저장된 파일 키 찾기
  const storedFileKey = findFileInLocalStorage();

  // 파일 이름 추출 (id_fileName에서 fileName만 추출)
  const fileName = storedFileKey ? storedFileKey.split("_")[1] : "";

  // 해당 키에 해당하는 파일 데이터 가져오기
  const storedFile = storedFileKey ? localStorage.getItem(storedFileKey) : null;

  // 게시글 삭제 함수
  const handleDeletePost = async (postId: string) => {
    await postStore.deletePost(postId);
    navigate("/post");
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 6 }}>
        게시물 상세
      </Typography>
      <Grid2 container alignItems="center" spacing={2} mb={4}>
        <Grid2 sx={{ flex: 2 }}>
          <Typography color="textSecondary">제목</Typography>
        </Grid2>

        <Grid2 sx={{ flex: 10 }}>
          <TextField
            type="text"
            value={posts?.title}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid2>
      </Grid2>
      <Grid2 container alignItems="center" spacing={2} mb={4}>
        <Grid2 sx={{ flex: 2 }}>
          <Typography color="textSecondary">내용</Typography>
        </Grid2>

        <Grid2 sx={{ flex: 10 }}>
          <TextField
            type="text"
            value={posts?.content}
            variant="outlined"
            multiline
            rows={9}
            fullWidth
            disabled
          />
        </Grid2>
      </Grid2>

      <Grid2 container gap={2} alignItems="center" mb={12}>
        <Grid2 sx={{ flex: 2 }}>
          <Typography color="textSecondary">파일 첨부</Typography>
        </Grid2>
        <Grid2
          sx={{ flex: 10 }}
          display="flex"
          alignItems="center"
          gap={1}
          justifyContent={"space-between"}
        >
          {storedFile ? (
            <>
              <Typography>📎 {fileName}</Typography>
              <Button
                component="label"
                color="success"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudDownload />}
                onClick={() => handleDownloadFile(storedFile, fileName)}
              >
                파일 다운로드
              </Button>
            </>
          ) : (
            <Typography color="textSecondary">첨부파일 없음</Typography>
          )}
        </Grid2>
      </Grid2>

      <Grid2
        container
        gap={2}
        alignItems="center"
        mb={12}
        justifyContent={"space-between"}
      >
        <ThemeButton onClick={handleGoToPostList}>
          게시글 목록으로 이동
        </ThemeButton>
        {posts?.authorId === userId && (
          <>
            <ThemeButton onClick={handleGoToUpdate}>게시글 수정</ThemeButton>
            <Button
              onClick={() => handleDeletePost(posts?.id!)}
              color="warning"
              variant="outlined"
            >
              삭제
            </Button>
          </>
        )}
      </Grid2>
    </Box>
  );
};
export default PostDetail;
