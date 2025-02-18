import { createTheme } from "@mui/material/styles";

const themeColors = {
  primary: "#74c69d", // 초록색 (주 테마 색상)
  secondary: "#fefae0", // 따뜻한 베이지
  accent: "#a67c52", // 갈색 (강조 색상)
  text: "#283618", // 어두운 초록 (텍스트 색상)
};

// MUI 테마 정의
const animalCrossingTheme = createTheme({
  palette: {
    primary: {
      main: themeColors.primary,
    },
    secondary: {
      main: themeColors.secondary,
    },
    text: {
      primary: themeColors.text,
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", sans-serif', // 동물의 숲 느낌의 폰트
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // 버튼에 둥근 모서리
          padding: "10px 20px",
          textTransform: "none", // 대문자 해제
        },
      },
    },
  },
});

export { animalCrossingTheme, themeColors };
