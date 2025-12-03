// src/context/ThemeContext.jsx
import React, { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  // cargar modo inicial desde localStorage
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // alternar tema claro/oscuro
  const toggleTheme = () => {
   const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  // crear el tema dinámico MUI
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              background: {
                default: "#0d1117",
                paper: "#161b22",
              },
              text: {
                primary: "#ffffff",
              }
            }
          : {
              background: {
                default: "#ffffff",
                paper: "#f5f5f5",
              },
              text: {
                primary: "#000000",
              }
            })
      },
    });
  }, [mode]);

  // actualizar clase del body cada vez que cambia el tema
  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
