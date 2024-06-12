import React from 'react'
import SocialsGrowth from '../utils/SocialsGrowthIcon'
import SwitchThemeButton from '../../Theme/SwitchThemeButton'
import DiscordLogo from '../../images/DiscordLogo.svg'
import TelegramLogo from '../../images/TelegramLogo.svg'
import XLogo from '../../images/XLogo.svg'
import LogoAndName from './LogoAndName'
function Footer() {
  return (
    <div className='fixed w-full z-30 '>
      <div className="w-full h-[70px] top-0 bg-semi-transparent-black pt-[10px] flex  justify-center">
        <div className=" w-full max-w-[1560px] h-full flex justify-between mx-[140px]">
          <div className="w-full max-w-[219px] flex justify-between pt-[3px]">
            <SocialsGrowth image={DiscordLogo} socialLink={'https://discord.com/invite/fuelnetwork'} subsForMonth={String(15.8)} />
            <SocialsGrowth image={XLogo} socialLink={'https://twitter.com/fuel_network'} subsForMonth={String(10.1)} />
            <SocialsGrowth image={TelegramLogo} socialLink={'https://t.me/fuelcommunity'} subsForMonth={String(5.9)} />
          </div>
          <LogoAndName />
          <SwitchThemeButton />
        </div>
      </div>
    </div>
  )
}

export default Footer