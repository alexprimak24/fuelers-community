import React from 'react'
import SocialsGrowth from './Components/SocialsGrowthIcon'
import SwitchThemeButton from '../Theme/SwitchThemeButton'
import DiscordLogo from '../images/DiscordLogo.svg'
import TelegramLogo from '../images/TelegramLogo.svg'
import XLogo from '../images/XLogo.svg'
import LogoAndName from './Components/LogoAndName'
function Footer() {
  return (
    <div className='fixed w-full max-w-[1560px]'>
      <div className="w-100% h-[70px] top-0 left-0  bg-semi-transparent-black pt-[10px] ">
        <div className="w-82% h-100% flex justify-around">
          <div className="w-[216px] flex justify-between">
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
// opacity-20