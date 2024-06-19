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
import appwriteService from "../src/appwrite/config";

interface contributionsProps {
  contentImg: string;
  contentLink: string;
  pfp: string;
  username: string;
  date: string;
  language: string;
  index: number;
  title: string;
}
export interface DocumentProps {
  document: contributionsProps;
}

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
  const [contributions, setContributions] = useState<DocumentProps[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await appwriteService.getPosts();
      if (response && response.documents) {
        const mappedPosts = response.documents.map((doc: any) => ({
          document: {
            contentImg: doc.contentImg,
            contentLink: doc.contentLink,
            pfp: doc.pfp,
            username: doc.username,
            date: doc.date,
            language: doc.language,
            index: doc.index,
            title: doc.title,
          },
        }));
        setContributions(mappedPosts);
      } else {
        console.log("No documents found");
      }
    };

    fetchPosts();
  }, []);
  console.log(contributions);

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
        <Carousel contributions={contributions} />
        <SocialsGrowth title="Best activity of the month." />
        <AllContributions contributions={contributions} />
        <Footer />
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
