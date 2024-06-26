import React from "react";
import LandingImg from "../../images/LandingImg.png";
import Particle from "../Particles/Particle";

const LandingPart = () => (
  <section className="relative w-full h-screen">
    <BackgroundImage src={LandingImg} />
    <OverlayContent />
    <ParticleContainer />
  </section>
);

const BackgroundImage = ({ src }: { src: string }) => (
  <div className="absolute inset-0">
    <img src={src} alt="Background" className="w-full h-full object-cover" />
  </div>
);

const OverlayContent = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
    <Title />
    <Separator />
    <PoweredBy />
    <Tagline />
  </div>
);

const Title = () => (
  <div className="flex  flex-col lg:flex-row gap-6">
    <h1 className="text-[64px] aax:text-[74px] ax:text-[96px] sm:text-[110px] aas:text-[128px] md:text-[144px] tracking-tight leading-none opacity-20">
      Fuelers
    </h1>
    <h1 className="text-[64px] aax:text-[74px] ax:text-[96px] sm:text-[110px] aas:text-[128px] md:text-[144px] tracking-tight leading-none opacity-20">
      Community
    </h1>
  </div>
);

const Separator = () => <div className="w-[291px] h-[2px] bg-white mt-9" />;

const PoweredBy = () => (
  <div className="flex items-center mt-7 font-grotesk text-[12px] aax:text-[14px] sm:text-base">
    Powered by
    <SeparatorVertical />
    Alex Primak
    <SeparatorVertical />
    Nikita Svitanko
  </div>
);

const SeparatorVertical = () => (
  <div className="w-[1px] h-[24px] bg-white mx-2.5" />
);

const Tagline = () => (
  <div className="text-[14px] aax:text-[16px] ax:text-[20px] sm:text-[22px] md:text-2xl am:text-3xl leading-normal mt-[35px] sm:mt-20 ">
    Made by the community for the community
  </div>
);

const ParticleContainer = () => (
  <div className="absolute inset-0 z-0">
    <Particle />
  </div>
);

export default LandingPart;
