import React from "react";
import CategoryToVoteButton from "./CategoryToVoteButton";
import Container from "../Container/Container";
import OptionsRadio from "./OptionsRadio";
import Auth from "./Auth";
function VotingSection() {
  return (
    <Container>
      <div className="rounded-[30px] border border-solid border-defaultwhite px-[45px] py-[50px] mt-[60px]">
        <div className="self-end sm:inline-table">
          <CategoryToVoteButton categoryName="Best Content" />
          <CategoryToVoteButton categoryName="Top contributor" />
          <CategoryToVoteButton categoryName="Best Activist" />
          <CategoryToVoteButton categoryName="Meme Machine" />
          <OptionsRadio />
          <Auth />
        </div>
      </div>
    </Container>
  );
}

export default VotingSection;
