import React from "react";
import PlusSign from "../../images/PlusSign.svg";
import useTheme from "../../Theme/themeContext";
import { IconType } from "react-icons";

export interface SocialsGrowthProps {
  Icon: IconType;
  socialLink: string;
  subsForMonth?: string;
  discord?: boolean;
}

function SocialsGrowth({
  Icon,
  socialLink,
  subsForMonth,
  discord,
}: SocialsGrowthProps) {
  const { themeColor } = useTheme();
  return (
    <div className="max-h-[45px] flex flex-col items-center gap-[8px]">
      <a href={socialLink} target="_blank" rel="noreferrer">
        <Icon
          className={`hover:fill-[#00F58C] transition-all duration-500`}
          style={{ width: discord ? "32px" : "" }}
          size="24px"
          color={themeColor("semiBlack")}
        />
      </a>
      {subsForMonth && (
        <div className="flex gap-[3px]">
          <img src={PlusSign} alt="PlusSign" />
          <p
            style={{ color: themeColor("black2") }}
            className="font-grotesk font-light text-xs"
          >
            {subsForMonth}k
          </p>
        </div>
      )}
    </div>
  );
}

export default SocialsGrowth;
