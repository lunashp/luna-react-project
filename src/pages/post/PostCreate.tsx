// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../stores/hooks/storeHooks";
// import { addPost } from "../../stores/features/posts/postSlice";
// import styled from "styled-components";
// import { TextField, Typography, Button, Grid2 } from "@mui/material";
// import useFile from "../../hooks/useFile";

// const Box = styled("div")`
//   margin-top: 120px;
//   text-align: center;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 20px;
//   width: 600px;
//   margin-left: auto;
//   margin-right: auto;
// `;

// //todo: 추후에 다중 파일 업로드 기능 추가
// const PostCreate = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const { file, fileName, handleFileChange, fileToBase64 } = useFile();

//   // 게시물 생성 핸들러
//   const handleCreate = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       // Redux를 통해 Firestore에 게시글 저장
//       const result = await dispatch(addPost({ title, content })).unwrap();

//       const postId = result.id; // Firestore에서 생성된 postId

//       // 파일이 있으면 LocalStorage에 저장
//       if (file) {
//         const base64File = await fileToBase64(file);
//         const storedFileName = `${postId}_${file.name}`; // postId_파일이름 형식

//         localStorage.setItem(storedFileName, base64File);
//         console.log(`파일이 저장되었습니다: ${storedFileName}`);
//       }

//       alert("게시물이 생성되었습니다.");
//       setTitle("");
//       setContent("");
//       navigate("/post"); // 게시글 생성 후 목록으로 이동
//     } catch (error) {
//       alert("게시물 생성에 실패했습니다.");
//       console.error(error);
//     }
//   };

//   return (
//     <Box>
//       <form onSubmit={handleCreate}>
//         <Typography variant="h4">게시물 생성</Typography>

//         <Grid2 container gap={2} alignItems="center">
//           <Typography color="textSecondary">제목</Typography>
//           <TextField
//             type="text"
//             value={title}
//             variant="outlined"
//             onChange={(e) => setTitle(e.target.value)}
//             fullWidth
//           />
//         </Grid2>

//         <Grid2 container gap={2} alignItems="center">
//           <Typography color="textSecondary">내용</Typography>
//           <TextField
//             value={content}
//             variant="outlined"
//             multiline
//             rows={6}
//             onChange={(e) => setContent(e.target.value)}
//             fullWidth
//           />
//         </Grid2>

//         {/* 파일 첨부 */}
//         <Grid2 container gap={2} alignItems="center">
//           <Typography color="textSecondary">파일 첨부</Typography>
//           <input type="file" onChange={handleFileChange} />
//           {fileName && <Typography variant="body2">📎 {fileName}</Typography>}
//         </Grid2>

//         <Button type="submit" variant="contained" color="primary">
//           생성
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default PostCreate;
