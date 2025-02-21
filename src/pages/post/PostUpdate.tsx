import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import postStore from "../../stores/features/posts/postStore";
import { Grid2, Typography } from "@mui/material";
import useFile from "../../hooks/useFile";

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
    <form onSubmit={handleUpdate}>
      <div>
        <h1>게시글 수정</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
        />
        {storedFile ? (
          <>
            <div>fileName: {fileName}</div>
            <button onClick={() => handleDownloadFile(storedFile, fileName)}>
              파일 다운로드
            </button>
          </>
        ) : (
          <>
            <Grid2 container gap={2} alignItems="center">
              <Typography color="textSecondary">파일 첨부</Typography>
              <input type="file" onChange={handleFileChange} />
              {fileName && (
                <Typography variant="body2">📎 {fileName}</Typography>
              )}
            </Grid2>
          </>
        )}
        <button type="submit">수정 완료</button>
        <button onClick={() => navigate(`/post/${id}`)}>취소</button>
      </div>
    </form>
  );
};

export default PostEdit;
