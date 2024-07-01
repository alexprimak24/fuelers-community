import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styled from "@emotion/styled";
import { Tabs, alpha } from "@mui/material";
import { darkColors, lightColors } from "@fuel-ui/css";

import OptionsRadio from "./OptionsRadio";

interface CategoryToVoteProps {
  values: number[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface NumsOfVotesForCatProps {
  best_contributor: number[];
  best_contribution: number[];
  best_activist: number[];
}
const NumsOfVotesForCat: NumsOfVotesForCatProps = {
  best_contributor: Array(5).fill(0),
  best_contribution: Array(5).fill(0),
  best_activist: Array(5).fill(0),
};

export default function CategoryToVote({ values }: CategoryToVoteProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const categories = ["Best Contributor", "Best Contribution", "Best Activist"];
  console.log(value);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          TabIndicatorProps={{ style: { display: "none" } }}
          className="self-end sm:inline-table"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {categories.map((category, index) => (
            <StyledTab label={category} value={index} {...a11yProps(0)} />
          ))}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <OptionsRadio values={[4, 6, 12, 6, 8]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OptionsRadio values={[3, 7, 8, 9, 2]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <OptionsRadio values={[6, 5, 23, 6, 1]} />
      </CustomTabPanel>
    </Box>
  );
}
//  {data.map((item, index) => (
//   <TabPanel value="1" key={index} className="mb-3">
//     <div ref={ref}>
//       <p className="text-defaultwhite text-2xl">
//         Discord - nikitasvitanko
//       </p>
//       {animate && (
//         <CustomProgressBar
//           bgColor={item.value === maxValue ? "#00F58C" : "#F5F5F5"}
//           height="40px"
//           labelColor="black"
//           baseBgColor="transparent"
//           animateOnRender={true}
//           completed={item.percentage}
//           customLabel={`${item.percentage.toFixed(2)}%`}
//           // className="border-[3px] border-solid border-defaultwhite"
//         />
//       )}
//     </div>
//   </TabPanel>
// ))}
