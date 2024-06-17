import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingPart from "./Components/Landing/LandingPart";
import Footer from "./Components/Footer/Footer";
import { Theme, ThemeContext } from "./Theme/themeContext";
import cybercity from "./images/cyberFuelCity.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import SocialsGrowth from "./Components/utils/shared";
import Carousel from "./Components/Carousel/Carousel";
import AllContributions from "./Components/AllContributions/AllContributions";

const colorsMaterial = createTheme({
  palette: {
    primary: {
      main: "#00F58C",
      light: "#B8FBCF",
      dark: "#00854D",
      contrastText: "#1E1E1E",
    },
    secondary: {
      main: "#F5F5F5",
      light: "rgba(245, 245, 245, 0.5)",
      contrastText: "#1E1E1E",
    },
  },
});

function App() {
  const [theme, setTheme] = useState<Theme>(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -300]);

  return (
    <ThemeProvider theme={colorsMaterial}>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <Header />
        <LandingPart />
        <img
          src={cybercity}
          alt="Scrolling Image"
          className="w-full max-h-[657px] object-cover border-y-solid border-y-defaultwhite border-y-[2px]"
        />
        <SocialsGrowth title="Recent works." />
        <Carousel />
        <SocialsGrowth title="Best activity of the month." />
        <AllContributions />
        <Footer />
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
