import React, { useEffect, useState } from "react";
import { Button, Grid2, styled, TextField, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { themeColors } from "../../theme/Theme";
import authStore from "../../stores/features/auth/authStore";
import userStore from "../../stores/features/user/userStore";
import { observer } from "mobx-react-lite";
import { ThemeButton } from "../../components/Button";

const Box = styled("div")`
  margin-top: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  /* justify-content: space-between; */
`;

const UserProfile = observer(() => {
  // const dispatch = useAppDispatch();
  // redux 사용 시
  const [newDisplayName, setNewDisplayName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const user = userStore.user;

  useEffect(() => {
    userStore.fetchCurrentUser();
  }, []);

  // 로그아웃 함수
  const handleLogout = async () => {
    await authStore.logout();
  };

  // 프로필 업데이트 함수
  // todo: 업데이트 이후 로직 고민 필요
  // todo: alert 등으로 사용자에게 알림 필요
  const handleUpdateProfile = async () => {
    await userStore.updateDisplayName(newDisplayName);
  };

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
    <Box>
      <AccountCircle
        style={{ color: themeColors.primary, fontSize: "5rem" }}
        sx={{ mb: 3 }}
      />
      {/* <h1>Profile</h1> */}
      {/* <Grid2 container justifyContent="space-between" > */}
      <Grid2 container sx={{ width: "70%" }}>
        <Typography color="textDisabled" sx={{ minWidth: "80px" }}>
          email
        </Typography>
        <Typography color="textDisabled" sx={{ flexGrow: 1 }}>
          {user?.email}
        </Typography>
      </Grid2>

      <Grid2 container sx={{ width: "70%" }}>
        {/* <Typography color="textDisabled" sx={{ minWidth: "80px" }}> */}
        <Typography color="textDisabled" sx={{ minWidth: "80px" }}>
          nickname
        </Typography>
        {/* <Typography color="textDisabled" sx={{ flexGrow: 1 }}>
          {user?.displayName}
        </Typography> */}

        <TextField
          // defaultValue={user?.displayName}
          value={user?.displayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
        />
        <Button
          onClick={handleUpdateProfile}
          color="success"
          variant="outlined"
        >
          이름 변경
        </Button>
        {/* <button onClick={handleUpdateProfile}>이름 변경</button> */}
      </Grid2>

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
      <p>
        <button onClick={handleLogout}>로그아웃</button>
      </p>
    </Box>
  );
});

export default UserProfile;

// {/*
//       {user?.displayName ? (
//         <Grid2 container sx={{ width: "70%" }}>
//           {/* <Typography color="textDisabled" sx={{ minWidth: "80px" }}> */}
//           <Typography color="textDisabled" sx={{ minWidth: "80px" }}>
//             nickname
//           </Typography>
//           <Typography color="textDisabled" sx={{ flexGrow: 1 }}>
//             {user?.displayName}
//           </Typography>
//           <TextField
//             defaultValue={user?.displayName}
//             value={displayName}
//             onChange={(e) => setNewDisplayName(e.target.value)}
//           />
//         </Grid2>
//       ) : (
//         <p>
//           <input
//             type="text"
//             placeholder="닉네임 입력"
//             value={newDisplayName}
//             onChange={(e) => setNewDisplayName(e.target.value)}
//           />
//           <button onClick={handleUpdateProfile}>이름 변경</button>
//         </p>
//       )}
//        */}
