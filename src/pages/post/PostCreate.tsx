import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../stores/hooks/storeHooks";
import { addPost } from "../../features/posts/postSlice";

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    try {
      await dispatch(addPost({ title, content })).unwrap();
      alert("게시물이 생성되었습니다.");
      setTitle("");
      setContent("");
      navigate("/post"); // 게시글 생성 후 홈으로 이동
    } catch (error) {
      alert("게시물 생성에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>게시물 생성</h1>
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
      <button onClick={handleCreate}>생성</button>
    </div>
  );
};

export default PostCreate;
