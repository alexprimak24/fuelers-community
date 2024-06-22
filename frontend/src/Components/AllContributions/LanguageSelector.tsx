import React, { useState } from "react";
import styled from "@emotion/styled";
import { darkColors } from "@fuel-ui/css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

interface LanguageSelectorProps {
  languages: string[];
  handleLanguageChange: (event: SelectChangeEvent<string>) => void;
  selectedLanguage: string;
}

const StyledFormControl = styled(FormControl)<{ theme: string }>`
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
      padding right: 0;
    }
    .MuiFormLabel-root {
      color: #E0FFFF;
    }
    .MuiSvgIcon-root {
      color: #E9E7FB;
      font-size: 32px;
      // opacity:0;
    }
  `}
`;

function LanguageSelector({
  languages,
  handleLanguageChange,
  selectedLanguage,
}: LanguageSelectorProps) {
  return (
    <div className="max-h-[100px] mt-[200px] w-full">
      <div className="flex text-center justify-between w-full  rounded-[30px] border border-solid border-defaultwhite px-[50px] py-[25px]">
        <p className="text-[32px]">Best work of all time</p>
        {/* CHANGE IT WHEN TIME ONCE DOING DAKR THEME */}
        <StyledFormControl size="small" theme={"dark"}>
          {/* <InputLabel>Language</InputLabel> */}
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
            // label="Language"
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
