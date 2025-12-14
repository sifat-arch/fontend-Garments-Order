import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};

export default useTheme;
