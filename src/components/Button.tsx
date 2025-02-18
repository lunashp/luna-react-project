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
