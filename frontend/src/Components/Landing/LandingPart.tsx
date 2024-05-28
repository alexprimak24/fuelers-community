import React from 'react'
import LangindgImg from "../../images/LandingImg.png"


function LandingPart() {
  return (
    <>
      <div className="absolute top-0 bottom-0 right-0 left-0 ">
        <img src={LangindgImg} alt="" className='block w-full h-full rounded object-center object-cover' />
      </div>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center z-10">
          <div className="max-w-[1170px] w-[100%] flex gap-[25px]">
            <h1 className="text-[144px] tracking-[-5.76px] leading-[122.4px] opacity-20">Fuelers</h1>
            <h1 className="text-[144px] tracking-[-5.76px] leading-[122.4px] opacity-20">Community</h1>
          </div>
          <div className="max-w-[291px] w-[100%] h-[2px] bg-defaultwhite mt-[35px]" />
          <div className="flex mt-[29px] font-grotesk">Powered by  <div className='w-[1px] h-[24px] h-[100%] bg-defaultwhite ml-[20px] mr-[10px]' />     Alex Primak     <div className='w-[1px] h-[24px] h-[100%] bg-defaultwhite ml-[20px] mr-[10px]' />   Nikita Svitanko</div>
          <div className="flex mt-[29px] text-[32px] leading-normal mt-[78px]">Made by the community for the community</div>
        </div>

      </div>
    </>



  )
}

export default LandingPart


