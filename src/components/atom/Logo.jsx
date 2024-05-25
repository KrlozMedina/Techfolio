import React from 'react'
import "../../styles/components/atom.css"
import logo from '../../assets/Logo.png'

const label = "Krloz Medina </>";

const Logo = () => {
  return (
    <h1 className='logo'>{label}</h1>
  )
}

const LogoHeader = () => {
  return (
    // <h1 className='logo-header'>{label}</h1>
    <img src={logo} alt="Logo" className='logo-imagen2'/>
  )
}

export { LogoHeader, Logo }
