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
import useTheme, { ColorName } from "../../Theme/themeContext";

interface AllItemsProps {
  contract: ContractAbi | null;
  sectionSelected: number;
  setSectionSelected: React.Dispatch<React.SetStateAction<number>>;
  optionToVote: number | null;
  setOptionToVote: React.Dispatch<React.SetStateAction<number | null>>;
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

// const StyledTab = styled(Tab)<{ themeColor: string }>`
//   min-width: 90px;
//   max-width: 180px;
//   height: 40px;
//   font-size: 1;
//   margin-right: 15px;
//   min-height: 40px;
//   padding: auto;
//   border-radius: 5px;
//   border: 1px solid ${darkColors.gray8};
//   color: ${darkColors.gray8};
//   transition: all 0.3s ease;
//   &:hover {
//     color: white;
//     border-color: ${alpha("#00F58C", 0.5)};
//     background: ${alpha("#00F58C", 0.1)};
//   }
//   &.Mui-selected {
//     border-color: ${darkColors.gray12};
//     color: ${darkColors.gray12};
//   }
// `;
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

export default function CategoryToVote({
  contract,
  sectionSelected,
  setSectionSelected,
  optionToVote,
  setOptionToVote,
}: AllItemsProps) {
  const [voteCategories, setVoteCategories] = useState<VoteCategoriesProps[]>(
    []
  );
  const [bestContributorOptions, setBestContributorOptions] = useState<
    number[]
  >(Array(5).fill(0));
  const [bestContributionOptions, setBestContributionOptions] = useState<
    number[]
  >(Array(5).fill(0));
  const [bestActivistOptions, setBestActivistOptions] = useState<number[]>(
    Array(5).fill(0)
  );
  const [status, setStatus] = useState<"success" | "loading" | "error">(
    "loading"
  );
  useEffect(() => {
    async function getAllItems() {
      if (contract !== null) {
        try {
          let contributor = await contract.functions
            .read_contributor()
            .txParams({
              gasLimit: 100_000,
            })
            .get();
          const contributorArr = Array.from(contributor?.value);
          setBestContributorOptions(contributorArr);

          let contribution = await contract.functions
            .read_contribution()
            .txParams({
              gasLimit: 100_000,
            })
            .get();
          const contributionArr = Array.from(contribution?.value);
          setBestContributionOptions(contributionArr);

          let activist = await contract.functions
            .read_activist()
            .txParams({
              gasLimit: 100_000,
            })
            .get();
          const activistArr = Array.from(activist?.value);
          setBestActivistOptions(activistArr);

          setStatus("success");
        } catch (e) {
          setStatus("error");
          console.log("ERROR:", e);
        }
      }
    }
    getAllItems();
  }, [
    contract,
    // bestContributorOptions,
    // bestContributionOptions,
    // bestActivistOptions,
  ]);
  console.log(sectionSelected);
  // console.log(bestContributionOptions);
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
