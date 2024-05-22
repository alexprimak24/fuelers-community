import React, { useState } from 'react';
import './App.css';
import Footer from './Header/Header';
import LandingPart from './Landing/LandingPart';
import { Theme, ThemeContext } from './Theme/themeContext'

function App() {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <div className="App">
        <Footer />
        <LandingPart />
        <LandingPart />
        <LandingPart />
        <LandingPart />
        <LandingPart />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
