import React, { useState, useEffect } from "react";
//import ThemeContext, { initialThemeState } from "./ThemeContext";

export const initialThemeState = {
  darkTheme: true,
  setDarkTheme: () => null
};

export const ThemeContext = React.createContext(initialThemeState);

const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(initialThemeState.darkTheme);

  const localStorage = window.localStorage;

  useEffect(() => {
    let savedThemeLocal = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "false";
    if (!!savedThemeLocal) {
      savedThemeLocal = JSON.parse(savedThemeLocal);
      setDarkTheme(savedThemeLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("globalTheme", darkTheme);
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
