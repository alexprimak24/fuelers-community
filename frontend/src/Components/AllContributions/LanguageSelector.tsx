import React, { useState } from "react";
import styled from "@emotion/styled";
import { darkColors } from "@fuel-ui/css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl/FormControl";
import Select from "@mui/material/Select";

const LanguagesVariants = [
  "All",
  "EN",
  "FR",
  "CH",
  "RU",
  "UA",
  "ES",
  "RO",
] as const;

export type Languages = (typeof LanguagesVariants)[number];

const StyledFormControl = styled(FormControl)<{ theme: string }>`
  ${(props) =>
    props.theme === "dark" &&
    `
   & fieldset {
      border: none;
    }
    .MuiInputBase-root {
      background-color: ${darkColors.gray1};
      color: #E9E7FB;
      border-bottom: 1px solid #E9E7FB;
      border-right: 1px solid #E9E7FB;

      &:hover {
        background: black;
      }
    }
    .MuiSelect-select {
      padding-left: 0;
      padding right: 0;
    }
    .MuiFormLabel-root {
      color: #E0FFFF;
    }
    .MuiSvgIcon-root {
      color: #E9E7FB;
      font-size: 32px;
    }
  `}
`;

function LanguageSelector() {
  const [language, setLanguage] = useState<Languages>("All");

  return (
    <div className="max-h-[100px] mt-[200px] w-full">
      <div className="flex text-center justify-between w-full  rounded-[30px] border border-solid border-defaultwhite px-[50px] py-[25px]">
        <p className="text-[32px]">Best work of all time</p>
        {/* CHANGE IT WHEN TIME ONCE DOING DAKR THEME */}
        <StyledFormControl size="small" theme={"dark"}>
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
            style={{ minWidth: "80px", maxHeight: "50px", fontSize: "20px" }}
            variant="outlined"
            value={language}
            onChange={(event) => setLanguage(event.target.value as Languages)}
          >
            {LanguagesVariants.map((language) => (
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
