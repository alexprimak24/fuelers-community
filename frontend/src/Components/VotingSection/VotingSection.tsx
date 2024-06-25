import React, { forwardRef } from "react";

import Container from "../Container/Container";
import OptionsRadio from "./OptionsRadio";
import Auth from "./Auth";
import CategoryToVote from "./CategoryToVote";
import CategoryToVoteButton from "./CategoryToVoteButton";
interface VotingSectionProps {
  // Other props if needed
}

const VotingSection = forwardRef<HTMLDivElement, VotingSectionProps>(
  (props, ref) => {
    return (
      <Container>
        <div
          ref={ref} // Added ref to the div
          id="voting-section" // Added ID for scrolling
          className="rounded-[30px] border border-solid border-defaultwhite px-[45px] py-[50px] mt-[60px]"
        >
          <div className="self-end sm:inline-table">
            {/* <CategoryToVoteButton categoryName="Best Content" />
            <CategoryToVoteButton categoryName="Top contributor" />
            <CategoryToVoteButton categoryName="Best Activist" /> */}
            {/* <OptionsRadio /> */}
            <CategoryToVote />
            <Auth />
          </div>
        </div>
      </Container>
    );
  }
);

export default VotingSection;
