import React from 'react'
import Projects from '@containers/Projects'
import Education from '@containers/Education'
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
