import React, { useState } from "react";
import { firebaseAuth, provider } from "../../config/FirebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../stores/hooks/storeHooks";
import { login } from "../../features/auth/authSlice";
import {
  Button,
  Grid2,
  IconButton,
  Input,
  InputAdornment,
  styled,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ThemeButton } from "../../components/Button";

const Box = styled("div")`
  margin-top: 150px;
  text-align: center;
  display: flex; /* flexbox 적용 */
  flex-direction: column; /* 세로 방향 정렬 */
  align-items: center; /* 내부 요소 가운데 정렬 */
  gap: 20px; /* 요소 사이 여백 추가 */
  width: 400px; /* Box의 너비를 키움 */
  margin-left: auto;
  margin-right: auto;
`;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  // 로그인 함수
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(login({ uid: user?.uid, email: user?.email! }));

      navigate("/post");
      console.log("로그인 성공", user);
    } catch (error: any) {
      console.error("로그인 오류", error.code, error.message);
    }
  };

  // 구글 로그인 함수
  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(firebaseAuth, provider);
      const user = userCredential.user;

      dispatch(login({ uid: user?.uid, email: user?.email! }));
      console.log("구글 로그인 성공", user);
    } catch (error) {
      console.log("구글 로그인 실패", error);
    }
  };

  /**
   * 비밀번호 보이기/숨기기 함수
   */
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // 회원가입 페이지로 이동
  const handleGoToSignUp = () => {
    navigate(`/join`);
  };

  return (
    <form onSubmit={handleLogin}>
      <Box>
        <Typography variant="h4" sx={{ mb: 6 }}>
          🌙
        </Typography>

        <Grid2 container gap={6} alignItems="center">
          <Typography color="textDisabled">email</Typography>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{ style: { textAlign: "center" } }}
          />
        </Grid2>

        <Grid2 container gap={4} alignItems="center" mb={6}>
          <Typography color="textDisabled">password</Typography>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ style: { textAlign: "center" } }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid2>

        <Grid2 container gap={4} alignItems="center" mb={6}>
          <ThemeButton type="submit">로그인</ThemeButton>
          <ThemeButton onClick={handleGoToSignUp}>회원가입</ThemeButton>
        </Grid2>
        {/* <Divider /> */}
        <Button onClick={handleGoogleLogin} color="success" variant="outlined">
          Google 로그인
        </Button>
      </Box>
    </form>
  );
};

export default Login;
