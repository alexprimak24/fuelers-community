import React, { useState } from "react";
import styled from "@emotion/styled";
import { lightColors, darkColors } from "@fuel-ui/css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select";

const LanguagesVariants = [
  "All",
  "EN",
  "CN",
  "beta-3",
  "beta-2",
  "beta-1",
  "latest",
  "nightly",
] as const;
export type Languages = (typeof LanguagesVariants)[number];

interface ExampleMenuItem {
  label: string;
  style?: React.CSSProperties;
}

const StyledFormControl = styled(FormControl) <{ theme: string }>`
  ${(props) =>
    props.theme === "dark" &&
    `
   & fieldset {
      border: none;
    }
    .MuiInputBase-root {
      background-color: ${darkColors.gray1};
      color: ${lightColors.scalesGreen7};
      border-bottom: 1px solid ${lightColors.scalesGreen7};
      border-right: 1px solid ${lightColors.scalesGreen7};

      &:hover {
        background: black;
      }
    }
    .MuiFormLabel-root {
      color: #E0FFFF;
    }
    .MuiSvgIcon-root {
      color: ${lightColors.scalesGreen7};
    }
  `}
`;

function LanguageSelector() {
  //add TYPES THERE
  // onst LanguagesVariants = [
  //   "All",
  //   "EN",
  //   "CN",
  //   "beta-3",
  //   "beta-2",
  //   "beta-1",
  //   "latest",
  //   "nightly",
  // ] as const;
  // export type Languages = (typeof LanguagesVariants)[number];
  const [language, setLanguage] = useState('All');
  return (
    <div className="mx-[140px] max-h-[100px] mt-[200px]">
      <div className="flex text-center justify-between w-full max-h-[100px] rounded-[30px] border border-solid border-defaultwhite px-[50px] py-[25px]">
        <p className="text-[32px]">Best work of all time</p>
        {/* CHANGE IT WHEN TIME ONCE DOING DAKR THEME */}
        <StyledFormControl size="small" theme={"dark"}>
          <span>
            <Select
              MenuProps={{
                PaperProps: {
                  style: {
                    background: "#181818",
                    color: "white",
                  },
                },
              }}
              id="toolchain-select"
              labelId="toolchain-select-label"
              label="Toolchain"
              style={{ minWidth: "80px", minHeight: "50px",fontSize:"24px" }}
              variant="outlined"
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value)
              }
            >
              {LanguagesVariants.map((language) => (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
          </span>
        </StyledFormControl>
      </div>
    </div>
  );
}

export default LanguageSelector;
