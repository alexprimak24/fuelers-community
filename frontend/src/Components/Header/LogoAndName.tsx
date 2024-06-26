import React from "react";
import Logo from "../../images/FuelCommunityLogo.svg";
function LogoAndName() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onClick={handleScrollToTop}
      className="flex gap-[20px] cursor-pointer items-center justify-center md:max-w-[177px] w-full h-[50px] md:mr-[170px]"
    >
      <img
        src={Logo}
        alt="Logo"
        className="w-[42px] h-[42px] sm:w-[50px] sm:h-[50px]"
      />
      <a className="font-normal text-variable-collection-default-white text-[24px] aax:text-[28px] sm:text-[32px]">
        Fuelers
      </a>
    </div>
  );
}

export default LogoAndName;
