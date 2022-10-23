import React from 'react'
import Header from '@components/Header'
import Aboutme from '../components/Aboutme'
import Projects from '@components/Projects'
import Education from '@components/Education'
import ContactMe from '@components/Contactme'
import Footer from '@components/Footer'
// import '@styles/_vars.scss'

const Home = () => {
  return (
    <div>
      <section>
        <Header />
        <h1 id="home" class="myName">Krloz Medina</h1>
      </section>
      <section className='container-home'>
        <Aboutme />
        <Projects />
        <Education />
        <ContactMe />
        <Footer />
      </section>
    </div>
  )
}

export default Home
