import React from "react";
import Switch from "antd/lib/switch";
import { TRUE } from "sass";

type Theme = "light" | "dark";

//local stylesheets should be placed in the public folder

const stylesheets = {
  light: "https://cdnjs.cloudflare.com/ajax/libs/antd/4.19.1/antd.min.css",
  dark: "styles/antd.darkgray.css"
};

// const stylesheets = {
//   light: "https://cdnjs.cloudflare.com/ajax/libs/antd/4.19.1/antd.min.css",
//   dark: "https://cdnjs.cloudflare.com/ajax/libs/antd/4.19.1/antd.dark.min.css"
// };

const createStylesheetLink = (): HTMLLinkElement => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.id = "antd-stylesheet";
  document.head.appendChild(link);
  return link;
};

const getStylesheetLink = (): HTMLLinkElement =>
  document.head.querySelector("#antd-stylesheet") || createStylesheetLink();

const systemTheme = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const getTheme = () =>
  (localStorage.getItem("theme") as Theme) || systemTheme();

const setTheme = (t: Theme) => {
  localStorage.setItem("theme", t);
  getStylesheetLink().href = stylesheets[t];
};

const ToggleTheme: React.FC = () => {
  // Set the default theme when the component is mounted
  const [checked, setChecked] = React.useState<boolean>(
    getTheme() === "dark" ? true : false
  );
  React.useEffect(() => setTheme(getTheme()), []);

  const toggleTheme = () => {
    setTheme(getTheme() === "dark" ? "light" : "dark");
    setChecked(!checked);
  };

  return <Switch checked={checked} onChange={toggleTheme} />;
};

export default ToggleTheme;
