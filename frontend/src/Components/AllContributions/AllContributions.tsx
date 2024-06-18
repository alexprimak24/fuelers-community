import React from "react";
import LanguageSelector from "./LanguageSelector";
import Contribution from "./Contribution";
import ContributionsGrid from "./ContributionsGrid";

function AllContributions() {
  return (
    <div className="flex items-center justify-center max-w-[2560px]">
      <div className="mx-[140px] self-center">
        <LanguageSelector />
        <ContributionsGrid />
      </div>
    </div>
  );
}

export default AllContributions;
