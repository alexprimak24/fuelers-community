import React from 'react'
import PlusSign from '../../images/PlusSign.svg'

export interface SocialsGrowthProps {
  image: string;
  socialLink: string;
  subsForMonth?: string;
}

function SocialsGrowth({ image, socialLink, subsForMonth }: SocialsGrowthProps) {

  const handleSocialClick = () => {
    window.location.href = socialLink;
  }
  return (
    <div className='max-h-[45px] flex flex-col items-center gap-[8px] '>
      <div className="cursor-pointer" onClick={handleSocialClick}>
        <img src={image} alt="socialIcon" className='hover:text-[#00F58C]' />
      </div>
      {subsForMonth && <div className="flex gap-[3px]">
        <img src={PlusSign} alt="PlusSign" />
        <p className="[font-family:'Px_Grotesk-Light',Helvetica] font-light text-xs">{subsForMonth}k</p>
      </div>}
    </div>
  )
}

export default SocialsGrowth