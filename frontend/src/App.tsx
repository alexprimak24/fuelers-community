import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import LandingPart from "./Components/Landing/LandingPart";
import Footer from "./Components/Footer/Footer";
import SectionTitle from "./Components/utils/shared";
import Carousel from "./Components/Carousel/Carousel";
import AllContributions from "./Components/AllContributions/AllContributions";
import appwriteService from "../src/appwrite/config";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DividerImage from "./Components/DividerImage/DividerImage";
import VotingSection from "./Components/VotingSection/VotingSection";
import useTheme from "./Theme/themeContext";
import Particle from "./Components/Particles/Particle";

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
  breakpoints: {
    values: {
      xs: 600,
      sm: 760,
      md: 1280,
      lg: 2000,
      xl: 2560,
    },
  },
});

function App() {
  const [contributions, setContributions] = useState<DocumentProps[]>([]);
  const [filteredContributions, setFilteredContributions] = useState<
    DocumentProps[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, _setPostsPerPage] = useState(9);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const values = [4, 2, 1, 3];
  const { themeColor, setTheme } = useTheme();
  const votingSectionRef = useRef<HTMLDivElement>(null);

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
        setContributions(mappedPosts.reverse());
        setFilteredContributions(mappedPosts);
        const uniqueLanguages = [
          "All",
          ...new Set(mappedPosts.map((post) => post.document.language)),
        ];
        setLanguages(uniqueLanguages);
      } else {
        console.log("No documents found");
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedLanguage) {
      if (selectedLanguage === "All") {
        setFilteredContributions(contributions);
      } else {
        setFilteredContributions(
          contributions.filter(
            (contribution) =>
              contribution.document.language === selectedLanguage
          )
        );
      }
    } else {
      setFilteredContributions(contributions);
    }
    setCurrentPage(1);
  }, [selectedLanguage, contributions]);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [setTheme]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredContributions.slice(
    firstPostIndex,
    lastPostIndex
  );
  const totalPages = Math.ceil(filteredContributions.length / postsPerPage);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <MuiThemeProvider theme={colorsMaterial}>
      <div style={{ backgroundColor: themeColor("white2") }}>
        <Header />
        <LandingPart />
        <DividerImage />
        <div className="">
          <SectionTitle title="Recent works." />
          <Carousel contributions={contributions} />
          <SectionTitle title="Best activity of the month." />
          <VotingSection ref={votingSectionRef} values={values} />
          <AllContributions
            contributions={currentPosts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(_event, page) => setCurrentPage(page)}
            languages={languages}
            handleLanguageChange={handleLanguageChange}
            selectedLanguage={selectedLanguage}
          />
          <Footer />
          <div className="absolute inset-0 z-10">
            <Particle />
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
