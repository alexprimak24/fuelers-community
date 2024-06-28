import React, { forwardRef } from "react";

import Container from "../Container/Container";
import OptionsRadio from "./OptionsRadio";
import Auth from "./Auth";
import CategoryToVote from "./CategoryToVote";
import CategoryToVoteButton from "./CategoryToVoteButton";
import useTheme from "../../Theme/themeContext";

interface VotingSectionProps {
  values: number[];
}

const VotingSection = forwardRef<HTMLDivElement, VotingSectionProps>(
  ({ values }, ref) => {
    const { themeColor } = useTheme();
    return (
      <Container>
        <div
          ref={ref} // Added ref to the div
          id="voting-section" // Added ID for scrolling
          style={{ borderColor: themeColor("black2") }}
          className="rounded-[30px] border border-solid px-[45px] py-[50px] mt-[60px]"
        >
          <div className="self-end sm:inline-table">
            {/* <CategoryToVoteButton categoryName="Best Content" />
            <CategoryToVoteButton categoryName="Top contributor" />
            <CategoryToVoteButton categoryName="Best Activist" /> */}
            {/* <OptionsRadio /> */}
            <CategoryToVote values={values} />
            <Auth />
          </div>
        </div>
      </Container>
    );
  }
);

export default VotingSection;
