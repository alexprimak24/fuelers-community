import React from 'react'
import DiscordLogo from '../../images/DiscordLogo.svg'
import TelegramLogo from '../../images/TelegramLogo.svg'
import XLogo from '../../images/XLogo.svg'
function Footer() {
  return (
    <div className='fixed z-10'>
      <div className="w-100% h-[70px] top-0 left-0 opacity-20 bg-[#1E1E1E]">
        <div className="w-82% h-100%">
          <div className="w-[216px] flex justify-between">
            <img src={DiscordLogo} alt="Discord" />
            <img src={TelegramLogo} alt="Telegram" />
            <img src={XLogo} alt="Discord" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
