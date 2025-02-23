import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TextField, Typography, Button, Grid2 } from "@mui/material";
import useFile from "../../hooks/useFile";
import postStore from "../../stores/features/posts/postStore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

//todo: 추후에 다중 파일 업로드 기능 추가
const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { file, fileName, handleFileChange, fileToBase64 } = useFile();

  // 게시글 생성 핸들러
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      const newPost = await postStore.addPost({ title, content });

      if (file) {
        const base64File = await fileToBase64(file);
        const storedFileName = `${newPost?.id}_${file.name}`; // postId_파일이름 형식
        localStorage.setItem(storedFileName, base64File);
        console.log(`파일이 저장되었습니다: ${storedFileName}`);
      }

      setTitle("");
      setContent("");
      navigate("/post"); // 게시글 생성 후 목록으로 이동
      alert("게시글이 등록되었습니다!");
    } catch (error) {
      alert("게시글 등록에 실패했습니다.");
    }
  };

  return (
    <Box>
      <form onSubmit={handleCreate}>
        <Typography variant="h4" sx={{ mb: 6 }}>
          게시물 생성
        </Typography>

        <Grid2 container alignItems="center" spacing={2} mb={4}>
          <Grid2 sx={{ flex: 2 }}>
            <Typography color="textSecondary">제목</Typography>
          </Grid2>

          {/* 입력 필드 (남은 공간 차지) */}
          <Grid2 sx={{ flex: 10 }}>
            <TextField
              type="text"
              value={title}
              variant="outlined"
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

        {/* 파일 첨부 */}
        <Grid2 container gap={2} alignItems="center" mb={12}>
          <Grid2 sx={{ flex: 2 }}>
            <Typography color="textSecondary">파일 첨부</Typography>
          </Grid2>
          <Grid2 sx={{ flex: 10 }}>
            {fileName ? (
              `📎 ${fileName}`
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
        <ThemeButton type="submit">생성</ThemeButton>
      </form>
    </Box>
  );
};

export default PostCreate;
