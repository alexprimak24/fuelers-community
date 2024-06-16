import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import cyberCity from "../../images/cyberFuelCity.jpg";
import Slide from "./Slide";

// // Example data
// const data = [
//   { id: 1, title: "Slide 1", description: "Description 1", image: "image1.jpg" },
//   { id: 2, title: "Slide 2", description: "Description 2", image: "image2.jpg" },
//   // Add more slides as needed
// ];

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
}

interface DataProps {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface CarouselComponentProps {
  settings?: CarouselProps;
  data?: DataProps[];
  //remove ? from data?: DataProps[];
}

const Carousel: React.FC<CarouselComponentProps> = ({ settings, data }) => {
  const defaultSettings: CarouselProps = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 4,
    autoplay: true,
    speed: 4000,
    pauseOnHover: true,
    cssEase: "linear",
    autoplaySpeed: 0,

    responsive: [
      {
        breakpoint: 1560,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5,
        },
      },
      {
        breakpoint: 764,
        settings: {
          slidesToShow: 1.2,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const finalSettings = { ...defaultSettings, ...settings };

  return (
    <div className=" bg-defaultblack2 flex items-center mt-[25px]">
      <div className="slider-container max-w-full">
        <Slider {...finalSettings}>
          <Slide key={1} />
          <Slide key={2} />
          <Slide key={3} />
          <Slide key={4} />
          <Slide key={5} />
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;

// {data.map((slide) => (
//   <Card key={slide.id} {...slide} />
// ))}
