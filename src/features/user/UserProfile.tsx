import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks/storeHooks";
import { firebaseAuth } from "../../config/FirebaseConfig";
import { logout, updateProfileAction } from "../auth/authSlice";
import { updateProfile } from "@firebase/auth";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  // redux 사용 시
  // const user = useAppSelector((state) => state.auth.user);
  const [displayName, setNewDisplayName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const user = firebaseAuth.currentUser;

  // 앱 실행 시 로그인한 사용자 정보 가져오기 (redux 사용 시)
  // useEffect(() => {
  //   fetchUserFromFirebase(dispatch);
  // }, [dispatch]);

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut();

      dispatch(logout());
      console.log("로그아웃 성공");
    } catch (error) {
      console.log("로그아웃 실패", error);
    }
  };

  // 프로필 업데이트 함수
  // todo: 업데이트 이후 로직 고민 필요
  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      await updateProfile(firebaseAuth.currentUser!, {
        displayName: displayName,
      });
      dispatch(updateProfileAction({ displayName: displayName }));
      console.log("프로필 업데이트 성공", user);
    } catch (error) {
      console.log("프로필 업데이트 실패", error);
    }
  };

  // // 파일 선택 시 호출 (브라우저 내에서 관리)
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     setPhoto(file);
  //   }
  // };

  // 파일 선택 시 호출 (브라우저 내에서 관리)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const localUrl = URL.createObjectURL(file);
      console.log("파일 선택됨:", localUrl);
      setPhoto(localUrl);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user?.email}</p>
      <p>Nickname: {user?.displayName}</p>
      <p>
        <input
          type="text"
          placeholder="닉네임 입력"
          value={displayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
        />
        <button onClick={handleUpdateProfile}>이름 변경</button>
      </p>
      <p>
        <button onClick={handleLogout}>로그아웃</button>
      </p>
      <p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            console.log("파일 선택 이벤트 발생");
            handleFileChange(e);
          }}
        />
      </p>
      {photo ? (
        <img src={photo} alt="Profile Preview" width={100} />
      ) : (
        <p>이미지가 선택되지 않았습니다.</p>
      )}
    </div>
  );
};

export default UserProfile;
