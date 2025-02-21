import { Button, styled } from "@mui/material";
import { themeColors } from "../theme/Theme";

export const ThemeButton = styled(Button)({
  backgroundColor: themeColors.primary,
  color: "white",
  "&:hover": {
    backgroundColor: themeColors.accent,
  },
  padding: "8px 65px",
  //   borderRadius: "30px",
  borderRadius: "12px",
});

export const BoardButton = styled(Button)({
  backgroundColor: themeColors.accent,
  color: "white",
  "&:hover": {
    backgroundColor: themeColors.text,
  },
  padding: "8px 65px",
  borderRadius: "22px",
  // borderRadius: "12px",
});
