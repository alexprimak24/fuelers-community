import React from "react";
import cyberCity from "../../images/cyberFuelCity.jpg";

function DividerImage() {
  return (
    <img
      src={cyberCity}
      alt="Scrolling Image"
      className="w-full h-auto min-h-[310px] max-h-[657px] object-cover border-y-2 border-y-defaultwhite"
    />
  );
}

export default DividerImage;
