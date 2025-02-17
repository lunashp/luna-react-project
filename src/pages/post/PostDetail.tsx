import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../stores/hooks/storeHooks";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const posts = useAppSelector((state) =>
    state.posts.posts.find((post) => post.id === id)
  );

  console.log("id", id);
  console.log("post", posts);

  const handleGoToPostList = () => {
    navigate("/post");
  };

  //todd: 본인 게시글만 수정할 수 있게끔
  const handleGoToUpdate = () => {
    navigate(`/post/${id}/update`);
  };

  return (
    <>
      <div>PostDetail</div>
      postId: {posts?.id}
      title: {posts?.title}
      content: {posts?.content}
      <button onClick={handleGoToPostList}>게시글 목록으로 이동</button>
      <button onClick={handleGoToUpdate}>게시글 수정</button>
    </>
  );
};
export default PostDetail;
