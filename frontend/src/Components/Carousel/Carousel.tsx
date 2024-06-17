import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Slide from "./Slide";
import appwriteService from "../../appwrite/config";

// // Example data
// const data = [
//   { id: 1, title: "Slide 1", description: "Description 1", image: "image1.jpg" },
//   { id: 2, title: "Slide 2", description: "Description 2", image: "image2.jpg" },
//   // Add more slides as needed
// ];
interface contributionsProps {
  imageUrl: string;
  title: string;
  contentUrl: string;
  language: string;
}
interface documentProps {
  document: contributionsProps;
}

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
  const [posts, setPosts] = useState<documentProps[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await appwriteService.getPosts();
      console.log("Fetched response:", response); // Add this line for debugging

      if (response && response.documents) {
        const mappedPosts = response.documents.map((doc: any) => ({
          document: {
            imageUrl: doc.imageUrl,
            title: doc.title,
            contentUrl: doc.contentUrl,
            language: doc.language,
          },
        }));
        setPosts(mappedPosts);
      } else {
        console.log("No documents found"); // Add this line for debugging
      }
    };

    fetchPosts();
  }, []);

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
  //TO DO CAROUSEL FIX
  return (
    <div className=" bg-defaultblack2 flex items-center mt-[25px]">
      <div className="slider-container max-w-full">
        <Slider {...finalSettings}>
          {posts.map((slide) => (
            <Slide
              key={slide.document.contentUrl}
              imageUrl={slide.document.imageUrl}
              title={slide.document.title}
              contentUrl={slide.document.contentUrl}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
