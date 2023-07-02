import React from 'react'
import "../../styles/components/atom.css"

const label = "Krloz Medina </>";

const Logo = () => {
  return (
    <h1 className='logo'>{label}</h1>
  )
}

const LogoHeader = () => {
  return (
    <h1 className='logo-header'>{label}</h1>
  )
}

export { LogoHeader, Logo }
