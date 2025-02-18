// components/Auth/AuthForm.tsx
import React, { useState } from "react";
import {
  Input,
  IconButton,
  InputAdornment,
  Typography,
  styled,
  Grid2,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ThemeButton } from "../../components/Button";

const Box = styled("div")`
  margin-top: 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

interface AuthFormProps {
  onSubmit: (email: string, password: string) => void; // 로그인/회원가입 함수
  buttonText: string; // 버튼 텍스트 (ex: "로그인" or "회원가입")
  onGoogleClick?: () => void; // 구글 로그인 (선택)
  goToAnother?: () => void; // 다른 페이지 이동 (ex: 회원가입으로 이동)
  anotherText?: string; // 이동 버튼 텍스트
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  buttonText,
  onGoogleClick,
  goToAnother,
  anotherText,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
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
                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid2>

        <Grid2 container gap={4} alignItems="center" mb={6}>
          <ThemeButton type="submit">{buttonText}</ThemeButton>
          {goToAnother && anotherText && (
            <ThemeButton onClick={goToAnother}>{anotherText}</ThemeButton>
          )}
        </Grid2>

        {onGoogleClick && (
          <Button onClick={onGoogleClick} color="success" variant="outlined">
            Google 로그인
          </Button>
        )}
      </Box>
    </form>
  );
};

export default AuthForm;
