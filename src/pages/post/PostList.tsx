import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../config/FirebaseConfig";
import { useAppDispatch, useAppSelector } from "../../stores/hooks/storeHooks";
import { deletePost, fetchPosts } from "../../features/posts/postSlice";

const PostList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const navigate = useNavigate();
  const currentUser = firebaseAuth.currentUser; // 현재 로그인한 사용자

  // todo: useSelector 로 loading 상태 추가

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // 게시글 삭제 함수
  const handleDeletePost = async (postId: string) => {
    try {
      await dispatch(deletePost(postId)).unwrap();
      alert("게시글이 삭제되었습니다.");
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>게시판</h1>
      <button onClick={() => navigate("/post/create")}>새 게시글 작성</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3 onClick={() => navigate(`/post/${post.id}`)}>{post.title}</h3>
            <p>작성자: {post.authorDisplayName}</p>
            {currentUser?.uid === post.authorId && (
              <>
                <button onClick={() => handleDeletePost(post.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
