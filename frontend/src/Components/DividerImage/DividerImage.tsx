import React from "react";
import cyberCity from "../../images/cyberFuelCity.jpg";

function DividerImage() {
  return (
    <img
      src={cyberCity}
      alt="Cybercity"
      className="w-full h-auto min-h-[310px] max-h-[657px] xxl:max-h-[950px] object-cover border-y-2 border-y-defaultwhite"
    />
  );
}

export default DividerImage;
