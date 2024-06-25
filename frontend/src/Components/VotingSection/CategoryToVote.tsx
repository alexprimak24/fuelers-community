import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { alpha } from "@mui/material";
import { darkColors, lightColors } from "@fuel-ui/css";

const StyledTab = styled(Tab)`
  min-width: 105px;
  max-width: 180px;
  height: 40px;
  font-size: 1;
  margin-right: 15px;
  min-height: 40px;
  padding: auto;
  border-radius: 5px;
  border: 1px solid ${darkColors.gray8};
  color: ${darkColors.gray8};
  transition: all 0.3s ease;
  &:hover {
    color: white;
    border-color: ${alpha("#00F58C", 0.5)};
    background: ${alpha("#00F58C", 0.1)};
  }
  &.Mui-selected {
    border-color: ${darkColors.gray12};
    color: ${darkColors.gray12};
  }
`;

export default function CategoryToVoteButton() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  console.log(value);
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            TabIndicatorProps={{ style: { display: "none" } }}
            className="self-end sm:inline-table"
          >
            <StyledTab label="Best Content" value="1" />
            <StyledTab label="Best Contributior" value="2" />
            <StyledTab label="Best Activist" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">Best Content</TabPanel>
        <TabPanel value="2">Best Contributior</TabPanel>
        <TabPanel value="3">Best Activist</TabPanel>
      </TabContext>
    </Box>
  );
}
