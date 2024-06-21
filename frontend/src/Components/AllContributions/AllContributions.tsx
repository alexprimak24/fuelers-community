import React from "react";
import LanguageSelector from "./LanguageSelector";
import Contribution from "./Contribution";
import ContributionsGrid from "./ContributionsGrid";
import { DocumentProps } from "../../App";
import Pagination from "./Pagination";

interface AllContributionsProps {
  contributions: DocumentProps[];
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

function AllContributions({
  contributions,
  totalPages,
  currentPage,
  onPageChange,
}: AllContributionsProps) {
  return (
    <div className="flex items-center justify-center max-w-[2560px]">
      <div className="mx-[140px] self-center">
        <div className="w-full">
          <LanguageSelector />
        </div>
        <ContributionsGrid contributions={contributions} />
        <div className="flex justify-end mr-[10px]">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default AllContributions;
