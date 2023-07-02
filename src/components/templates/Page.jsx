import React from 'react'
import { Language } from '../molecules/Language'
import { LogoHeader } from '../atom/Logo'
import { MenuAside, MenuPhone } from '../organisms/Menu'
import '../../styles/components/template.css'

const Page = (props) => {
  return (
    <div className='template__container'>
      <div className='menuPhone'>
        <MenuPhone />
      </div>

      <div className='language'>
        <Language />
      </div>
      
      <div className='template__main'>
        <LogoHeader />
        {props.children}
      </div>

      <aside className='template__aside'>
        <MenuAside />
      </aside>
    </div>
  )
}

export default Page