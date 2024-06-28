import React from "react";
import Box from "@mui/material/Box";
import SocialsGrowth from "../utils/SocialsGrowthIcon";
import XLogo from "../../images/XLogo.svg";
import ForumLogo from "../../images/ForumLogo.svg";
import DiscordLogo from "../../images/DiscordLogo.svg";
import GithubLogo from "../../images/GithubLogo.svg";
import TelegramLogo from "../../images/TelegramLogo.svg";
import useTheme from "../../Theme/themeContext";
import { FaDiscord, FaTelegramPlane, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdChatbubbles } from "react-icons/io";

interface StyledBoxProps {
  children?: React.ReactNode;
}

function StyledBox({ children }: StyledBoxProps) {
  const { themeColor } = useTheme();

  return (
    <Box
      width="100%"
      marginTop={4}
      display="flex"
      flexDirection="column"
      alignItems="left"
      gap="27px"
      sx={{ borderTop: `2px solid ${themeColor("white5")}` }}
      className={`px-[16px] ax:px-[20px] as:px-[40px] lg:px-[70px] xl:px-[140px] pt-[100px] aax:pt-[120px] md:pt-[160px] xl:pt-[200px]`}
    >
      {children}
    </Box>
  );
}

function Footer() {
  const { themeColor } = useTheme();
  return (
    <StyledBox>
      <h1
        style={{ color: themeColor("white3") }}
        className="text-4xl ax:text-5xl md:text-6xl am:text-7xl font-groteskpanbold"
      >
        <span>Join </span>
        <span className="opacity-50">the active </span>
        <span style={{ color: themeColor("green2") }}>Fuel </span>
        <span className="opacity-50">community!</span>
      </h1>
      <p
        style={{ color: themeColor("white3") }}
        className="text-base max-w-[340px] aax:max-w-[450px] sm:max-w-[500px] aas:max-w-[582px]"
      >
        This site is not official Fuel resource, it has been done by the
        community members. It was created for the purpose of highlighting Fuel
        supporters, their contributions and works. <br />
        We invite anyone interested in Fuel to join our community to share
        knowledge, ideas and experiences. Let's create something amazing
        together!
      </p>
      <div className="flex flex-col items-center mt-[30px] lg:mt-[50px] xl:mt-[75px]">
        <div className="flex gap-[20px] lg:gap-[40px]">
          <SocialsGrowth
            Icon={FaDiscord}
            socialLink={"https://discord.gg/fuelnetwork"}
            discord={true}
          />
          <SocialsGrowth
            Icon={FaXTwitter}
            socialLink={"https://twitter.com/fuel_network"}
          />
          <SocialsGrowth
            Icon={FaTelegramPlane}
            socialLink={"https://t.me/fuelcommunity"}
          />
          <SocialsGrowth
            Icon={FaGithub}
            socialLink={"https://github.com/FuelLabs"}
          />
          <SocialsGrowth
            Icon={IoMdChatbubbles}
            socialLink={"https://forum.fuel.network/"}
          />
        </div>
        <div
          style={{ background: themeColor("black2") }}
          className="max-w-[100px] w-full h-[2px] mt-[20px] mb-[10px]"
        />
        <p
          style={{ color: themeColor("white3") }}
          className="font-grotesk font-lg mb-[15px]"
        >
          ©2024
        </p>
      </div>
    </StyledBox>
  );
}

export default Footer;
