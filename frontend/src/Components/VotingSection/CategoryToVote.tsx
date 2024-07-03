import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styled from "@emotion/styled";
import { Tabs, alpha } from "@mui/material";
import { darkColors, lightColors } from "@fuel-ui/css";
import appwriteService from "../../../src/appwrite/config";
import OptionsRadio from "./OptionsRadio";
import { ContractAbi } from "../../contracts";

interface AllItemsProps {
  contract: ContractAbi | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface categoryProps {
  image: string;
  discordHandle: string;
  contentlink: string;
}

export interface VoteCategoriesProps {
  document: categoryProps;
}

export interface CategoryToVoteProps extends VoteCategoriesProps {
  values: number[];
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

export default function CategoryToVote({ contract }: AllItemsProps) {
  const [value, setValue] = useState(0);
  const [voteCategories, setVoteCategories] = useState<VoteCategoriesProps[]>(
    []
  );
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await appwriteService.getVoteCategories();
      if (response && response.documents) {
        const mappedPosts = response.documents.map((doc: any) => ({
          document: {
            image: doc.image,
            discordHandle: doc.discordHandle,
            contentlink: doc.contentlink,
          },
        }));
        setVoteCategories(mappedPosts.reverse());
      } else {
        console.log("No documents found");
      }
    };

    fetchPosts();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const categories = ["Best Contributor", "Best Contribution", "Best Activist"];
  const data1 = {
    voteCategories: voteCategories.slice(0, 5),
    values: [4, 6, 12, 6, 8],
  };
  const data2 = {
    voteCategories: voteCategories.slice(5, 10),
    values: [3, 7, 8, 9, 2],
  };
  const data3 = {
    voteCategories: voteCategories.slice(10, 15),
    values: [6, 5, 23, 6, 1],
  };

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
        <OptionsRadio data={data1} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OptionsRadio data={data2} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <OptionsRadio data={data3} />
      </CustomTabPanel>
    </Box>
  );
}
