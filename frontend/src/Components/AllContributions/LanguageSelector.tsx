import React from "react";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useMediaQuery, useTheme } from "@mui/material";

interface LanguageSelectorProps {
  languages: string[];
  handleLanguageChange: (event: SelectChangeEvent<string>) => void;
  selectedLanguage: string;
}

const StyledFormControl = styled(FormControl)<{
  theme: string;
  isSmallScreen: boolean;
}>`
  ${(props) =>
    props.theme === "dark" &&
    `
   & fieldset {
      border: none;
    }
    .MuiInputBase-root {
      background-color: #181818;
      color: #E9E7FB;
      border-bottom: 1px solid #00F58C;
      border-right: 1px solid #00F58C;

      &:hover {
        background: transparent;
        border-bottom: 1px solid rgba(0, 245, 140, 0.7);
        border-right: 1px solid rgba(0, 245, 140, 0.7);
      }
    }
    .MuiSelect-select {
      padding-left: 0;
      padding-right: 0;
    }
    .MuiFormLabel-root {
      color: #E0FFFF;
    }
    .MuiSvgIcon-root {
      color: #E9E7FB;
      font-size: ${props.isSmallScreen ? "24px" : "32px"};
    }
  `}
`;

function LanguageSelector({
  languages,
  handleLanguageChange,
  selectedLanguage,
}: LanguageSelectorProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="max-h-[100px] mt-[140px] ax:mt-[200px] w-full">
      <div className="flex text-center justify-between w-full rounded-[30px] border border-solid border-defaultwhite px-[25px] py-[17px] aax:px-[30px] sm:px-[50px] aax:py-[20px] sx:py-[25px]">
        <p className="text-center text-[20px] aax:text-[24px] ax:text-[28px] sm:text-[32px]">
          Best work of all time
        </p>
        <StyledFormControl
          size="small"
          theme={"dark"}
          isSmallScreen={isSmallScreen}
        >
          <Select
            MenuProps={{
              PaperProps: {
                style: {
                  background: "#181818",
                  color: "white",
                },
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="min-w-[80px] max-h-[35px] font-[16px] ax:max-h-[50px] ax:font-[20px] sm:mt-[5px]"
            variant="outlined"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            defaultChecked={true}
          >
            {languages.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </div>
    </div>
  );
}

export default LanguageSelector;
