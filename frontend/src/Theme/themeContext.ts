import { useCallback, useMemo } from "react";
import { darkColors, lightColors } from "@fuel-ui/css";
import { useFuelTheme } from "@fuel-ui/react";

interface ColorMapping {
  light: string;
  dark: string;
}
export interface Theme {
  theme: "light" | "dark";
}
export type ColorName =
  | "white1"
  | "white2"
  | "white3"
  | "white4"
  | "white5"
  | "white6"
  | "white7"
  | "white8"
  | "black1"
  | "black2"
  | "black3"
  | "black4"
  | "black5"
  | "green1"
  | "green2"
  | "semiBlack";

const COLORS: Record<ColorName, ColorMapping> = {
  white1: {
    light: "#1E1E1E",
    dark: "#F5F5F5",
  },
  white2: {
    light: "#FFF",
    dark: "#000",
  },
  white3: {
    light: "#000",
    dark: "#F5F5F5",
  },
  white4: {
    light: "#181818",
    dark: "#E9E7FB",
  },
  white5: {
    light: "rgba(30, 30, 30, 0.7)",
    dark: "#F5F5F5",
  },
  white6: {
    light: "rgba(0, 0, 0, 0.7)",
    dark: "#F5F5F5",
  },
  white7: {
    light: "rgba(0, 0, 0, 0.3)",
    dark: "rgba(255, 255, 255, 0.8)",
  },
  white8: {
    light: lightColors.gray8,
    dark: darkColors.gray8,
  },

  black1: {
    light: "#F5F5F5",
    dark: "rgba(30, 30, 30, 0.2)",
  },
  black2: {
    light: "#000",
    dark: "#FFF",
  },
  black3: {
    light: "#E9E7FB",
    dark: "#181818",
  },
  black4: {
    light: "#000",
    dark: "#00f58c",
  },
  black5: {
    light: "#FFF",
    dark: "#181818",
  },
  semiBlack: {
    light: "rgba(0, 0, 0, 0.5)",
    dark: "rgba(245, 245, 245, 0.5)",
  },
  green1: {
    light: "rgba(30, 30, 30, 0.7)",
    dark: "#00F58C",
  },
  green2: {
    light: "#00F58C",
    dark: "#B8FBCF",
  },
};

export default function useTheme() {
  const { current: currentTheme, setTheme } = useFuelTheme();
  const themeColor = useCallback(
    (name: ColorName) => COLORS[name][currentTheme as "light" | "dark"],
    [currentTheme]
  );
  return {
    theme: currentTheme,
    setTheme,
    themeColor,
  };
}
