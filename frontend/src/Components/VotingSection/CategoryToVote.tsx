import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styled from "@emotion/styled";
import { alpha } from "@mui/material";
import { darkColors, lightColors } from "@fuel-ui/css";
import ProgressBar from "@ramonak/react-progress-bar";
import { useInView } from "react-intersection-observer";

interface CategoryToVoteProps {
  values: number[];
}

const CustomProgressBar = styled(ProgressBar)`
  .wrapper {
    border: 3px solid blue;
    border-radius: 20px; /* Add border radius to the wrapper */
    overflow: hidden; /* Ensure the content doesn't overflow */
  }
  .completed {
    border-radius: 20px; /* Add border radius to the completed part */
  }
`;

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

export default function CategoryToVote({ values }: CategoryToVoteProps) {
  const [value, setValue] = useState(0);
  const [animate, setAnimate] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        setAnimate(true); // Set animate to true on view
      }
    },
  });

  // Sum of all the values aka numbers of votes
  const total = values.reduce((acc, value) => acc + value, 0);
  // Data to give to the percentage bar
  const data = values.map((value, index) => ({
    label: `Value ${index + 1}`,
    percentage: (value / total) * 100,
    value,
  }));
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // Find the max value
  const maxValue = Math.max(...values);

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
            <StyledTab label="Best Content" value={0} />
            <StyledTab label="Best Contributor" value={1} />
            <StyledTab label="Best Activist" value={2} />
          </TabList>
        </Box>
        {data.map((item, index) => (
          <TabPanel value="1" key={index} className="mb-3">
            <div ref={ref}>
              <p className="text-defaultwhite text-2xl">
                Discord - nikitasvitanko
              </p>
              {animate && (
                <CustomProgressBar
                  bgColor={item.value === maxValue ? "#00F58C" : "#F5F5F5"}
                  height="40px"
                  labelColor="black"
                  baseBgColor="transparent"
                  animateOnRender={true}
                  completed={item.percentage}
                  customLabel={`${item.percentage.toFixed(2)}%`}
                  // className="border-[3px] border-solid border-defaultwhite"
                />
              )}
            </div>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
