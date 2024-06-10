import React from 'react';
import LandingImg from '../../images/LandingImg.png';
import Particle from '../Particles/Particle';

function LandingPart() {

  return (
    <div className="relative h-[100vh]">
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden z-10">
        <img
          src={LandingImg}
          alt="Fixed Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="flex flex-col items-center justify-center">
            <div className="max-w-[1170px] w-full flex gap-[25px]">
              <h1 className="text-[144px] tracking-[-5.76px] leading-[122.4px] opacity-20">Fuelers</h1>
              <h1 className="text-[144px] tracking-[-5.76px] leading-[122.4px] opacity-20">Community</h1>
            </div>
            <div className="max-w-[291px] w-full h-[2px] bg-defaultwhite mt-[35px]" />
            <div className="flex mt-[29px] font-grotesk">
              Powered by
              <div className='w-[1px] h-[24px] bg-defaultwhite ml-[20px] mr-[10px]' />
              Alex Primak
              <div className='w-[1px] h-[24px] bg-defaultwhite ml-[20px] mr-[10px]' />
              Nikita Svitanko
            </div>
            <div className="flex text-[32px] leading-normal mt-[78px]">Made by the community for the community</div>
          </div>
          <Particle />
        </div>
      </div>
    </div>
  );
}

export default LandingPart;
