import React, { useState } from "react";
import deploy from "../../images/deploy.png";

export default function Slide() {
  const [hover, setHover] = useState(false);

  const defaultShadow = "0 0 10px 7px var(--Default-green, #00F58C)";
  const hoverShadow = "0 0 5px 7px var(--Default-green, #00F58C)";

  return (
    <div className="flex flex-col gap-[10px] mx-[15px] mb-[7px] pt-[31px]">
      <a
        href=""
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        className="transition-shadow duration-300 ease-in-out"
        style={{
          display: "block",
          maxHeight: "420px",
          height: "100%",
          boxShadow: hover ? hoverShadow : defaultShadow,
          borderRadius: "4px", // optional: to match the border radius if needed
        }}
      >
        <img
          src={deploy}
          alt=""
          className="max-h-[420px] h-full border-[4px] border-defaultgreen shadow-fancy hover:shadow-fancy-hover transition-shadow duration-300 ease-in-out"
        />
      </a>
      <p className="text-defaultwhite text-opacity-50 text-2xl">
        How to deploy on Beta-5
      </p>
    </div>
  );
}
