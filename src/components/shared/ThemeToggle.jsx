// src/components/shared/ThemeToggle.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ThemeToggle() {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <Tooltip title={mode === "light" ? "Activar modo oscuro" : "Desactivar modo oscuro"}>
      <IconButton onClick={toggleTheme} color="inherit" size="large">
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
