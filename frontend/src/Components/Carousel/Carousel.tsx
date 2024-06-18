import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Slide from "./Slide";
import { DocumentProps } from "../../App";

interface ResponsiveSettings {
  breakpoint: number;
  settings: CarouselProps;
}

interface CarouselProps {
  dots?: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  autoplay?: boolean;
  speed?: number;
  autoplaySpeed?: number;
  cssEase?: string;
  pauseOnHover?: boolean;
  height?: string;
  centerMode?: boolean;
  responsive?: ResponsiveSettings[];
  centerPadding?: string;
  arrows?: boolean;
  pauseOnFocus?: boolean;
}

interface CarouselComponentProps {
  settings?: CarouselProps;
  contributions: DocumentProps[];
}

function Carousel({ settings, contributions }: CarouselComponentProps) {
  const defaultSettings: CarouselProps = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 3.5,
    autoplay: true,
    speed: 4000,
    pauseOnFocus: true,
    pauseOnHover: true,
    // cssEase: "linear",
    autoplaySpeed: 0,

    responsive: [
      {
        breakpoint: 1560,
        settings: {
          slidesToShow: 2,
          speed: 3000,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5,
          speed: 2000,
        },
      },
      {
        breakpoint: 764,
        settings: {
          slidesToShow: 1.2,
          speed: 2000,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          speed: 2000,
        },
      },
    ],
  };
  //const defaultShadow =
  //  "inset 20px 0 20px -20px var(--Default-green, #00F58C), inset -20px 0 20px -20px var(--Default-green, #00F58C)";
  const finalSettings = { ...defaultSettings, ...settings };
  //TO DO CAROUSEL FIX
  return (
    // <div className=" bg-defaultblack2 flex items-center mt-[25px] ">
    <div
      className="mt-[25px] "
      // style={{
      //   boxShadow: defaultShadow,
      // }}
    >
      <Slider {...finalSettings}>
        {contributions.map((contribution) => {
          return (
            <Slide
              key={contribution.document.contentUrl}
              imageUrl={contribution.document.imageUrl}
              title={contribution.document.title}
              contentUrl={contribution.document.contentUrl}
            />
          );
        })}
      </Slider>
    </div>
    // </div>
  );
}

export default Carousel;
