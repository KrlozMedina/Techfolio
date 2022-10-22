import React from 'react'
import Projects from '@components/Projects'
import Education from '@components/Education'
import ContactMe from '@components/Contactme'
import '@styles/_vars.scss'

const Home = () => {
  return (
    <div className='.darkMode'>
      <Projects />
      <Education />
      <ContactMe />
    </div>
  )
}

export default Home
