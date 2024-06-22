import React from "react";
import cyberCity from "../../images/cyberFuelCity.jpg";

function DividerImage() {
  return (
    <img
      src={cyberCity}
      alt="Scrolling Image"
      className="w-full max-h-[657px] object-cover border-y-solid border-y-defaultwhite border-y-[2px]"
    />
  );
}

export default DividerImage;
