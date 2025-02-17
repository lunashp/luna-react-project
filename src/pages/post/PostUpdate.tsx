import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks/storeHooks";
import { updatePost } from "../../features/posts/postSlice";

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const post = useAppSelector((state) =>
    state.posts.posts.find((post) => post.id === id)
  );

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
  const handleUpdate = async () => {
    if (!id) return alert("게시글 ID가 없습니다.");
    if (!title.trim() || !content.trim()) return alert("내용을 입력하세요.");

    try {
      await dispatch(updatePost({ id, title, content })).unwrap();
      alert("게시글이 수정되었습니다.");
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("게시글 수정 실패", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return (
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
      <button onClick={handleUpdate}>수정 완료</button>
      <button onClick={() => navigate(`/post/${id}`)}>취소</button>
    </div>
  );
};

export default PostEdit;
