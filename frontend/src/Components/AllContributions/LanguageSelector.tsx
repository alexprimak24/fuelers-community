import React from "react";
import styled from "@emotion/styled";
import { lightColors, darkColors } from "@fuel-ui/css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select";

const LanguagesVariants = [
  "testnet",
  "beta-5",
  "beta-4",
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

const StyledFormControl = styled(FormControl)<{ theme: string }>`
  ${(props) =>
    props.theme === "dark" &&
    `
    & fieldset {
      border: none;
    }
    .MuiInputBase-root {
      background-color: ${darkColors.gray1};
      color: ${lightColors.gray1};
      outline: 1px solid ${darkColors.gray8};
      &:hover {
        background: transparent;
      }
    }
    .MuiFormLabel-root {
      color: white;
    }
    .MuiSvgIcon-root {
      color: ${lightColors.gray8};
    }
  `}
`;

function LanguageSelector() {
  return (
    <div className="mx-[140px] max-h-[100px]">
      <div className="flex text-center justify-between w-full max-h-[100px] rounded-[30px] border border-solid border-defaultwhite px-[50px] pt-[25px]">
        <p className="text-[32px]">Best work of all time</p>
        {/* CHANGE IT WHEN TIME ONCE DOING DAKR THEME */}
        <StyledFormControl size="small" theme={"dark"}>
          <InputLabel id="example-select-label">All</InputLabel>
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
              style={{ minWidth: "80px" }}
              variant="outlined"
              // onChange={(event) =>
              //   setToolchain(event.target.value as Toolchain)
              // }
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
