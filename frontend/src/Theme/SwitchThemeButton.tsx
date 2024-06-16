import { useThemeContext } from "./themeContext";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function SwitchThemeButton() {
  const { theme, setTheme } = useThemeContext();
  return (
    <IconButton
      aria-label="swithThemes"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      sx={{ width: "50px", height: "50px" }}
    >
      {theme === "light" && (
        <LightModeIcon
          sx={{
            color: "#FFF",
            width: "35px",
            height: "35px",
            ":hover": { color: "#00F58C", transition: "color 0.5s" },
          }}
        />
      )}
      {theme !== "light" && (
        <DarkModeIcon
          sx={{
            color: "#F5F5F5",
            width: "35px",
            height: "35px",
            ":hover": { color: "#00F58C", transition: "color 0.5s" },
          }}
        />
      )}
    </IconButton>
  );
}

export default SwitchThemeButton;
