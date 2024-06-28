import React from "react";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useMediaQuery, useTheme as useThemeMui } from "@mui/material";
import useTheme, { ColorName } from "../../Theme/themeContext";

interface LanguageSelectorProps {
  languages: string[];
  handleLanguageChange: (event: SelectChangeEvent<string>) => void;
  selectedLanguage: string;
}

const StyledFormControl = styled(FormControl)<{
  isSmallScreen: boolean;
  themeColor: (name: ColorName) => string;
}>`
  & fieldset {
    border: none;
  }
  .MuiInputBase-root {
    background-color: ${(props) => props.themeColor("black3")};
    color: ${(props) => props.themeColor("white4")};
    border-bottom: 1px solid ${(props) => props.themeColor("black4")};
    border-right: 1px solid ${(props) => props.themeColor("black4")};
    &:hover {
      background: transparent;
      border-bottom: 1px solid rgba(0, 245, 140, 0.7);
      border-right: 1px solid rgba(0, 245, 140, 0.7);
    }
  }
  .MuiSvgIcon-root {
    color: ${(props) => props.themeColor("white4")};
    font-size: ${(props) => (props.isSmallScreen ? "24px" : "32px")};
  }
`;

function LanguageSelector({
  languages,
  handleLanguageChange,
  selectedLanguage,
}: LanguageSelectorProps) {
  const themeMui = useThemeMui();
  const isSmallScreen = useMediaQuery(themeMui.breakpoints.down("sm"));
  const { themeColor } = useTheme();

  return (
    <div className="max-h-[100px] mt-[140px] ax:mt-[200px] w-full">
      <div
        style={{ borderColor: themeColor("black2") }}
        className="flex text-center justify-between w-full rounded-[30px] border border-solid px-[25px] py-[17px] aax:px-[30px] sm:px-[50px] aax:py-[20px] sx:py-[25px]"
      >
        <p
          style={{ color: themeColor("black2") }}
          className="text-center text-[20px] aax:text-[24px] ax:text-[28px] sm:text-[32px]"
        >
          Best work of all time
        </p>
        <StyledFormControl
          size="small"
          isSmallScreen={isSmallScreen}
          themeColor={themeColor}
        >
          <Select
            MenuProps={{
              PaperProps: {
                style: {
                  background: themeColor("black5"),
                  color: themeColor("white5"),
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
