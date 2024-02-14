import { useEffect, useContext, useState, createContext } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      document.documentElement.classList.add("add");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  onWindowMatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      localStorage.removeItem("theme");
      onWindowMatch();
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ handleThemeSwitch, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const ThemeState = () => {
  return useContext(ThemeContext);
};
