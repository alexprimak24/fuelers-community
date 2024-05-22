import React from 'react'
import Logo from '../../images/FuelCommunityLogo.svg'
function LogoAndName() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div onClick={handleScrollToTop} className='flex gap-[20px] cursor-pointer'>
      <img src={Logo} alt="" />
      <a className="[font-family:'Px_Grotesk_Pan-Regular',Helvetica] font-normal text-variable-collection-default-white text-[32px] text-center">Fuelers</a>
    </div>
  )
}

export default LogoAndName