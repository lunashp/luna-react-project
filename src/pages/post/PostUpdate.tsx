import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import postStore from "../../stores/features/posts/postStore";
import { Button, Grid2, styled, TextField, Typography } from "@mui/material";
import useFile from "../../hooks/useFile";
import { CloudDownload } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "./PostCreate";
import { ThemeButton } from "../../components/Button";

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

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // 전달된 state에서 fileName, storedFile 받기
  const { fileName, storedFile } = location.state || {};

  const { handleFileChange, handleDownloadFile, file, fileToBase64 } =
    useFile();

  // todo: url을 받아도 될 것 같음
  const post = postStore.posts.find((post) => post.id === id);

  // 수정할 제목과 내용 상태
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  // 게시글 수정 처리 함수
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return alert("게시글 ID가 없습니다.");
    if (!title.trim() || !content.trim()) return alert("내용을 입력하세요.");

    try {
      if (file) {
        const base64File = await fileToBase64(file);
        const storedFileName = `${id}_${file.name}`; // postId_파일이름 형식

        localStorage.setItem(storedFileName, base64File);
        console.log(`파일이 저장되었습니다: ${storedFileName}`);
      }

      await postStore.updatePost({ id, title, content });

      alert("게시글이 수정되었습니다.");
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("게시글 수정 실패", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  //todo: 첨부 파일이 있으면 보이게끔, 파일 업로드 가능하게끔
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 6 }}>
        게시물 수정
      </Typography>
      <form onSubmit={handleUpdate}>
        <Grid2 container alignItems="center" spacing={2} mb={4}>
          <Grid2 sx={{ flex: 2 }}>
            <Typography color="textSecondary">제목</Typography>
          </Grid2>

          <Grid2 sx={{ flex: 10 }}>
            <TextField
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
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
              value={content}
              variant="outlined"
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={9}
              fullWidth
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
              <Button
                component="label"
                color="success"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                파일 첨부
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  multiple
                />
              </Button>
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
          <ThemeButton type="submit">수정 완료</ThemeButton>
          <Button
            color="warning"
            variant="outlined"
            onClick={() => navigate(`/post/${id}`)}
          >
            취소
          </Button>
        </Grid2>
      </form>
    </Box>
  );
};

export default PostEdit;
