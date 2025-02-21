import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// // import { useAppDispatch, useAppSelector } from "../../stores/hooks/storeHooks";
// import { deletePost, fetchPosts } from "../../stores/features/posts/postSlice";

// const PostList = () => {
//   const dispatch = useAppDispatch();
//   const posts = useAppSelector((state) => state.posts.posts);
//   const navigate = useNavigate();

//   // todo: useSelector 로 loading 상태 추가

//   useEffect(() => {
//     dispatch(fetchPosts());
//   }, [dispatch]);

//   // 날짜 내림차순 정렬 (최신 글이 먼저)
//   const sortedPosts = [...posts].sort(
//     (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
//   );

//   // 게시글 삭제 함수
//   // 임시
//   const handleDeletePost = async (postId: string) => {
//     try {
//       await dispatch(deletePost(postId)).unwrap();
//       alert("게시글이 삭제되었습니다.");
//       navigate("/post");
//     } catch (error) {
//       alert("게시글 삭제에 실패했습니다.");
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>게시판</h1>
//       <button onClick={() => navigate("/post/create")}>새 게시글 작성</button>
//       {sortedPosts.map((post) => (
//         <div
//           key={post.id}
//           style={{
//             border: "1px solid gray",
//             padding: "10px",
//             margin: "10px 0",
//           }}
//         >
//           <h3
//             onClick={() => navigate(`/post/${post.id}`)}
//             style={{ cursor: "pointer" }}
//           >
//             {post.title}
//           </h3>
//           <p>{post.content}</p>
//           <p>작성일: {new Date(post.date!).toLocaleString()}</p>{" "}
//           <button onClick={() => handleDeletePost(post.id!)}>삭제</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostList;

const PostList = () => {
  return <div>게시판</div>;
};

export default PostList;
