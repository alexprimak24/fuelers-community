import React from "react";
import cyberCity from "../../images/cyberFuelCity.jpg";
import { motion } from "framer-motion";

const appearanceAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

function DividerImage() {
  return (
    <motion.img
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }}
      src={cyberCity}
      alt="Scrolling Image"
      className="w-full h-auto min-h-[310px] max-h-[657px] xxl:max-h-[950px] object-cover border-y-2 border-y-defaultwhite"
    />
  );
}

export default DividerImage;
