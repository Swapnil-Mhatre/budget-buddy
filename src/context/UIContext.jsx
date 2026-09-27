import { createContext, useEffect, useState } from "react";

export const UIContextData = createContext();

const UIContext = (props) => {
  const [themeSettings, setThemeSettings] = useState(
    JSON.parse(localStorage.getItem("themeSettings")) || {
      mode: "Light",
      colorPalette: "purple",
      budgetAlerts: true,
      dateFormat: "YYYY-MM-DD",
    },
  );
  const [width, setWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });
  const [sidebarStatus, setSidebarStatus] = useState(
    window.innerWidth <= 910 ? false : true,
  );

  function changeTheme() {
    // Mode
    document.documentElement.style.setProperty(
      "--background-color",
      `var(--Theme-${themeSettings.mode})`,
    );

    document.documentElement.style.setProperty(
      "--background-color-secondary",
      `var(--Theme-${themeSettings.mode}-secondary)`,
    );

    document.documentElement.style.setProperty(
      "--text-color",
      `var(--Theme-${themeSettings.mode}-Text-Color)`,
    );

    // color Palette

    document.documentElement.style.setProperty(
      "--color-palette",
      `var(--color-palette-${themeSettings.colorPalette})`,
    );
    document.documentElement.style.setProperty(
      "--color-palette-transparent",
      `var(--color-palette-${themeSettings.colorPalette}-transparent)`,
    );
  }

  useEffect(() => {
    localStorage.setItem("themeSettings", JSON.stringify(themeSettings));
    changeTheme();
  }, [themeSettings]);

  return (
    <UIContextData.Provider
      value={{
        themeSettings,
        width,
        sidebarStatus,
        setThemeSettings,
        setSidebarStatus,
      }}
    >
      {props.children}
    </UIContextData.Provider>
  );
};

export default UIContext;
