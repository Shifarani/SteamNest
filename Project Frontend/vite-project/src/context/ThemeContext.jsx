import { createContext, useContext, useEffect, useState } from "react";


const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });


  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem("themeColor") || "orange";
  });


  // Dark / Light Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


  // Theme Color
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeColor);
    localStorage.setItem("themeColor", themeColor);
  }, [themeColor]);


  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };


  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        themeColor,
        setThemeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);