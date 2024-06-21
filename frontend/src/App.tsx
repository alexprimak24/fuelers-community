import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingPart from "./Components/Landing/LandingPart";
import Footer from "./Components/Footer/Footer";
import { Theme, ThemeContext } from "./Theme/themeContext";
import cybercity from "./images/cyberFuelCity.jpg";
import SocialsGrowth from "./Components/utils/shared";
import Carousel from "./Components/Carousel/Carousel";
import AllContributions from "./Components/AllContributions/AllContributions";
import appwriteService from "../src/appwrite/config";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

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
  const [filteredContributions, setFilteredContributions] = useState<
    DocumentProps[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

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
        setFilteredContributions(mappedPosts);
        const uniqueLanguages = [
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
      setFilteredContributions(
        contributions.filter(
          (contribution) => contribution.document.language === selectedLanguage
        )
      );
    } else {
      setFilteredContributions(contributions);
    }
    setCurrentPage(1);
  }, [selectedLanguage, contributions]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredContributions.slice(
    firstPostIndex,
    lastPostIndex
  );
  const totalPages = Math.ceil(filteredContributions.length / postsPerPage);

  console.log(contributions);

  const [theme, setTheme] = useState<Theme>(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setSelectedLanguage(event.target.value);
  };

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
        <AllContributions
          contributions={currentPosts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(event, page) => setCurrentPage(page)}
        />

        <FormControl
          variant="outlined"
          style={{ minWidth: 120, margin: "20px 0" }}
        >
          <InputLabel>Language</InputLabel>
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            label="Language"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {languages.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Footer />
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
