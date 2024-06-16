import React from "react";
import Box from "@mui/material/Box";
import SocialsGrowth from "../utils/SocialsGrowthIcon";
import XLogo from "../../images/XLogo.svg";
import ForumLogo from "../../images/ForumLogo.svg";
import DiscordLogo from "../../images/DiscordLogo.svg";
import GithubLogo from "../../images/GithubLogo.svg";
import TelegramLogo from "../../images/TelegramLogo.svg";

interface StyledBoxProps {
  children?: React.ReactNode;
}

function StyledBox({ children }: StyledBoxProps) {
  return (
    <Box
      height={600}
      width="100%"
      //REMOVE ME
      my={4}
      display="flex"
      flexDirection="column"
      alignItems="left"
      gap="27px"
      pt={"200px"}
      className="border-y-solid border-y-defaultwhite border-t-[2px] px-[140px]"
    >
      {children}
    </Box>
  );
}

function Footer() {
  return (
    <StyledBox>
      <h1 className="text-7xl text-defaultwhite font-groteskpanbold">
        <span>Join </span>
        <span className="opacity-50">the active </span>
        <span className="text-[74px] text-defaultlightgreen">Fuel </span>
        <span className="opacity-50">community!</span>
      </h1>
      <p className="text-base text-defaultwhite max-w-[582px]">
        This site is not official Fuel resource, it has been done by the
        community members. It was created for the purpose of highlighting Fuel
        supporters, their contributions and works. <br />
        We invite anyone interested in Fuel to join our community to share
        knowledge, ideas and experiences. Let's create something amazing
        together!
      </p>
      <div className="flex flex-col items-center mt-[75px]">
        <div className="flex gap-[40px]">
          <SocialsGrowth
            image={DiscordLogo}
            socialLink={"https://discord.gg/fuelnetwork"}
          />
          <SocialsGrowth
            image={XLogo}
            socialLink={"https://twitter.com/fuel_network"}
          />
          <SocialsGrowth
            image={TelegramLogo}
            socialLink={"https://t.me/fuelcommunity"}
          />
          <SocialsGrowth
            image={GithubLogo}
            socialLink={"https://github.com/FuelLabs"}
          />
          <SocialsGrowth
            image={ForumLogo}
            socialLink={"https://forum.fuel.network/"}
          />
        </div>
        <div className="max-w-[100px] w-full h-[2px] bg-defaultwhite mt-[20px] mb-[10px]" />
        <p className="font-grotesk font-lg">©2024</p>
      </div>
    </StyledBox>
  );
}

export default Footer;
