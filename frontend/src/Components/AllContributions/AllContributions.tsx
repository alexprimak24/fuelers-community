import React from "react";
import LanguageSelector from "./LanguageSelector";
import ContributionsGrid from "./ContributionsGrid";
import { DocumentProps } from "../../App";
import Pagination from "./Pagination";
import { SelectChangeEvent } from "@mui/material/Select";
import Container from "../Container/Container";

interface AllContributionsProps {
  contributions: DocumentProps[];
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  languages: string[];
  handleLanguageChange: (event: SelectChangeEvent<string>) => void;
  selectedLanguage: string;
}

function AllContributions({
  contributions,
  totalPages,
  currentPage,
  onPageChange,
  languages,
  handleLanguageChange,
  selectedLanguage,
}: AllContributionsProps) {
  return (
    <div className="flex justify-center items-center">
      <Container>
        <div className="w-full">
          <LanguageSelector
            languages={languages}
            handleLanguageChange={handleLanguageChange}
            selectedLanguage={selectedLanguage}
          />
        </div>
        <ContributionsGrid contributions={contributions} />
        <div className="flex justify-end mr-[10px]">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
          />
        </div>
      </Container>
    </div>
  );
}

export default AllContributions;
