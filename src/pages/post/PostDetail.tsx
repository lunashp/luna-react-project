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

  return (
    <>
      <div>PostDetail</div>
      postId: {posts?.id}
      title: {posts?.title}
      content: {posts?.content}
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
