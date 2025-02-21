import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFile from "../../hooks/useFile";
import postStore from "../../stores/features/posts/postStore";
import authStore from "../../stores/features/auth/authStore";

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
    postStore.deletePost(postId);
    navigate("/post");
  };

  return (
    <>
      <div>PostDetail</div>
      postId: {posts?.id}
      title: {posts?.title}
      content: {posts?.content}
      {storedFile && (
        <>
          <div>fileName: {fileName}</div>
          <button onClick={() => handleDownloadFile(storedFile, fileName)}>
            파일 다운로드
          </button>
        </>
      )}
      <button onClick={handleGoToPostList}>게시글 목록으로 이동</button>
      {posts?.authorId === userId && (
        <>
          <button onClick={handleGoToUpdate}>게시글 수정</button>
          <button onClick={() => handleDeletePost(posts?.id!)}>삭제</button>
        </>
      )}
    </>
  );
};
export default PostDetail;
