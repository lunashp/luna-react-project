import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks/storeHooks";
import { deletePost } from "../../features/posts/postSlice";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const posts = useAppSelector((state) =>
    state.posts.posts.find((post) => post.id === id)
  );

  const userId = useAppSelector((state) => state.auth.user?.uid);
  console.log("postID", posts?.authorId);
  console.log("userId", userId);

  /**
   * 현재 로그인한 사용자 정보(firbaseAuth.currentUser)를 가져오는 방법
   */
  // const currentUser = firebaseAuth.currentUser; // 현재 로그인한 사용자

  const handleGoToPostList = () => {
    navigate("/post");
  };

  const handleGoToUpdate = () => {
    navigate(`/post/${id}/update`);
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

  const storedFileKey = findFileInLocalStorage(); // posts.id로 저장된 파일 키 찾기

  const fileName = storedFileKey ? storedFileKey.split("_")[1] : ""; // 파일 이름 추출 (id_fileName에서 fileName만 추출)
  console.log("fileName", fileName);

  const storedFile = storedFileKey ? localStorage.getItem(storedFileKey) : null; // 해당 키에 해당하는 파일 데이터 가져오기

  // 게시글 삭제 함수
  const handleDeletePost = async (postId: string) => {
    try {
      await dispatch(deletePost(postId)).unwrap();
      alert("게시글이 삭제되었습니다.");
      navigate("/post");
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
      console.error(error);
    }
  };

  const handleDownloadFile = () => {
    // localStorage에 파일이 저장된 경우
    if (storedFile) {
      // Base64로 저장된 파일을 Blob 형태로 변환
      const byteCharacters = atob(storedFile.split(",")[1]);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset++) {
        const byte = byteCharacters.charCodeAt(offset);
        byteArrays.push(byte);
      }

      const byteArray = new Uint8Array(byteArrays);
      const fileBlob = new Blob([byteArray], {
        type: "application/octet-stream",
      });

      // Blob을 다운로드할 수 있는 URL로 변환
      const url = window.URL.createObjectURL(fileBlob);
      const a = document.createElement("a");
      a.href = url;
      // a.download = `${posts?.id}_file`; // 다운로드 시 파일명 설정
      a.download = `${fileName}`; // 다운로드 시 파일명 설정
      a.click();
      window.URL.revokeObjectURL(url); // URL 해제
    } else {
      alert("파일이 없습니다.");
    }
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
          <button onClick={handleDownloadFile}>파일 다운로드</button>
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
