import React from "react";
import LanguageSelector from "./LanguageSelector";
import Contribution from "./Contribution";
import ContributionsGrid from "./ContributionsGrid";
import { DocumentProps } from "../../App";

interface AllContributionsProps {
  contributions: DocumentProps[];
}

function AllContributions({ contributions }: AllContributionsProps) {
  return (
    <div className="flex items-center justify-center max-w-[2560px]">
      <div className="mx-[140px] self-center">
        <LanguageSelector />
        <ContributionsGrid contributions={contributions} />
      </div>
    </div>
  );
}

export default AllContributions;
