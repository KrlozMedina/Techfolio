import React from 'react'
import Header from '@components/Header'
import About from '../components/About'
import Projects from '@components/Projects'
import Education from '@components/Education'
import Contact from '@components/Contact'
import Footer from '@components/Footer'
// import '@styles/_vars.scss'

const Home = () => {
  return (
    <div>
      <section>
        <Header />
        <h1 id="home" className="myName">Krloz Medina</h1>
      </section>
      <section className='container-home'>
        <About />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </section>
    </div>
  )
}

export default Home
