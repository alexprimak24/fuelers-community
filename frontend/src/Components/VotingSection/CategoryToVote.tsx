import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import styled from "@emotion/styled";
import { Tabs, alpha } from "@mui/material";
import appwriteService from "../../../src/appwrite/config";
import OptionsRadio from "./OptionsRadio";
import { ContractAbi } from "../../contracts";
import useTheme, { ColorName } from "../../Theme/themeContext";
import { getAllItems } from "./GetUsersVotes";

interface AllItemsProps {
  contract: ContractAbi | null;
  sectionSelected: number;
  setSectionSelected: React.Dispatch<React.SetStateAction<number>>;
  optionToVote: number | null;
  setOptionToVote: React.Dispatch<React.SetStateAction<number | null>>;
  setBestContributorOptions: React.Dispatch<React.SetStateAction<number[]>>;
  setBestContributionOptions: React.Dispatch<React.SetStateAction<number[]>>;
  setBestActivistOptions: React.Dispatch<React.SetStateAction<number[]>>;
  setStatus: React.Dispatch<
    React.SetStateAction<"loading" | "success" | "error" | "none">
  >;
  bestActivistOptions: number[];
  bestContributionOptions: number[];
  bestContributorOptions: number[];
  setSubmittingVoteStatus: (
    value: React.SetStateAction<"loading" | "success" | "error" | "none">
  ) => void;
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

const StyledTab = styled(Tab)<{
  themeColor: (name: ColorName) => string;
}>`
  ${(props) =>
    `
      min-width: 90px;
      max-width: 180px;
      height: 40px;
      font-size: 1;
      margin-right: 15px;
      min-height: 40px;
      padding: auto;
      border-radius: 5px;
      border: 1px solid ${props.themeColor("white8")};
      color: ${props.themeColor("white8")};
      transition: all 0.3s ease;
    &:hover {
      color: ${props.themeColor("white1")};
      border-color: ${alpha("#00F58C", 0.5)};
      background: ${alpha("#00F58C", 0.1)};
     }
    &.Mui-selected {
      border-color: ${props.themeColor("white3")};
      color: ${props.themeColor("white3")};
    }
  `}
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
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CategoryToVote({
  contract,
  sectionSelected,
  setSectionSelected,
  optionToVote,
  setOptionToVote,
  setBestContributorOptions,
  setBestContributionOptions,
  setBestActivistOptions,
  setStatus,
  bestActivistOptions,
  bestContributionOptions,
  bestContributorOptions,
  setSubmittingVoteStatus,
}: AllItemsProps) {
  const [voteCategories, setVoteCategories] = useState<VoteCategoriesProps[]>(
    []
  );
  useEffect(() => {
    getAllItems({
      contract,
      setBestContributorOptions,
      setBestContributionOptions,
      setBestActivistOptions,
      setStatus,
    });
  }, [
    contract,
    setBestContributorOptions,
    setBestContributionOptions,
    setBestActivistOptions,
    setStatus,
  ]);
  console.log("sectionSelected:", sectionSelected);
  console.log("optionToVote:", optionToVote);
  // console.log(status);
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
    setSectionSelected(newValue);
    setOptionToVote(null);
    setSubmittingVoteStatus("none");
  };

  const categories = ["Best Contributor", "Best Contribution", "Best Activist"];

  const bestActivist = {
    voteCategories: voteCategories.slice(0, 5),
    values: bestActivistOptions,
  };
  const bestContributionData = {
    voteCategories: voteCategories.slice(5, 10),
    values: bestContributionOptions,
  };
  const bestContributorData = {
    voteCategories: voteCategories.slice(10, 15),
    values: bestContributorOptions,
  };

  const { themeColor } = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            color: themeColor("white3"),
            // "&:Mui-disabled": {
            //   color: themeColor("white3"),
            // },
          }}
          value={sectionSelected}
          onChange={handleChange}
          aria-label="basic tabs example"
          allowScrollButtonsMobile={true}
          variant="scrollable"
        >
          {categories.map((category, index) => (
            <StyledTab
              label={category}
              value={index}
              {...a11yProps(0)}
              themeColor={themeColor}
            />
          ))}
        </Tabs>
      </Box>
      <CustomTabPanel value={sectionSelected} index={0}>
        <OptionsRadio
          data={bestContributorData}
          optionToVote={optionToVote}
          setOptionToVote={setOptionToVote}
        />
      </CustomTabPanel>
      <CustomTabPanel value={sectionSelected} index={1}>
        <OptionsRadio
          data={bestContributionData}
          optionToVote={optionToVote}
          setOptionToVote={setOptionToVote}
          isContribution={true}
        />
      </CustomTabPanel>
      <CustomTabPanel value={sectionSelected} index={2}>
        <OptionsRadio
          data={bestActivist}
          optionToVote={optionToVote}
          setOptionToVote={setOptionToVote}
        />
      </CustomTabPanel>
    </Box>
  );
}
