import React from 'react'
import Language from '../molecules/Language'
import Logo from '../atom/Logo'
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
        <Logo className='logo' />
        {props.children}
      </div>

      <aside className='template__aside'>
        <MenuAside />
      </aside>
    </div>
  )
}

export default Page