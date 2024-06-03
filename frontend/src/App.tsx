import React, { useEffect, useMemo, useState } from "react";
import './App.css';
import Footer from './Components/Header/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LandingPart from './Components/Landing/LandingPart';
import { Theme, ThemeContext } from './Theme/themeContext'
import Particle from "./Components/Particles/Particle";

const colorsMaterial = createTheme({
  palette: {
    primary: {
      main: '#00F58C',
      light: '#B8FBCF',
      dark: '#00854D',
      contrastText: '#1E1E1E'
    },
    secondary: {
      main: '#F5F5F5',
      light: 'rgba(245, 245, 245, 0.5)',
      contrastText: '#1E1E1E'
    }
  },
});


function App() {
  const [theme, setTheme] = useState<Theme>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');


  return (
    <ThemeProvider theme={colorsMaterial}>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <Footer />
        <LandingPart />
        <Particle />
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
