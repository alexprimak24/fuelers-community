import React from "react";
import FuelCommunityLogo from "../../images/FuelCommunityLogo";
import useTheme from "../../Theme/themeContext";

function LogoAndName() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { themeColor } = useTheme();
  return (
    <div
      onClick={handleScrollToTop}
      className="flex gap-[20px] cursor-pointer items-center justify-center md:max-w-[177px] w-full h-[50px] md:mr-[170px]"
    >
      <FuelCommunityLogo color={themeColor("white1")} />
      <button
        style={{ color: themeColor("white1") }}
        className="font-normal text-[24px] aax:text-[28px] sm:text-[32px]"
      >
        Fuelers
      </button>
    </div>
  );
}

export default LogoAndName;
