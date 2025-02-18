import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../config/FirebaseConfig";
import { updateProfile } from "@firebase/auth";
import { useAppDispatch } from "../../stores/hooks/storeHooks";
import { logout, updateProfileAction } from "../../features/auth/authSlice";

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
      // localStorage.removeItem("profileImage");
      console.log("로그아웃 성공");
    } catch (error) {
      console.log("로그아웃 실패", error);
    }
  };

  // 프로필 업데이트 함수
  // todo: 업데이트 이후 로직 고민 필요
  // todo: alert 등으로 사용자에게 알림 필요
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

  // 파일 선택 시 호출 (브라우저 내에서 관리)
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     const localUrl = URL.createObjectURL(file);
  //     console.log("파일 선택됨:", localUrl);
  //     setPhoto(localUrl);
  //   }
  // };

  // local storage에 이미지 저장
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 파일 크기 제한 (5MB 이하)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기가 너무 큽니다. 5MB 이하의 이미지를 선택해주세요");
        return;
      }

      // 파일 확장자 검증 (JPG, PNG, GIF만 허용)
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        alert("지원되지 않는 이미지 형식입니다! (JPG, PNG, GIF만 가능)");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // localStorage.setItem("profileImage", base64String);
        localStorage.setItem(`${user?.uid}_profileImage`, base64String);
        setPhoto(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  // 페이지 로드 시 LocalStorage에서 이미지 불러오기
  useEffect(() => {
    // const storedImage = localStorage.getItem("profileImage");
    const storedImage = localStorage.getItem(`${user?.uid}_profileImage`);
    if (storedImage) {
      setPhoto(storedImage);
    }
  }, []);

  // 이미지 삭제 함수
  const handleRemovePhoto = () => {
    localStorage.removeItem(`${user?.uid}_profileImage`);
    setPhoto(null);
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
      {photo && <button onClick={handleRemovePhoto}>사진 삭제</button>}
    </div>
  );
};

export default UserProfile;
