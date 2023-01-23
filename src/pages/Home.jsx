import React from 'react'
// import Navbar from '../components/molecules/Navbar'
import About from '../components/organisms/About'
import Application from '../components/organisms/Application'
import Education from '../components/organisms/Education'
import Contact from '../components/organisms/Contact'
import Footer from '../components/organisms/Footer'
import Popup from '../components/Popup'

import '../styles/pages/Home.css'
import Header from '../components/organisms/Header'

const Home = () => {
  return (
    <div>
      {/* <span className="background__intersection"></span> */}
      {/* <section> */}
        {/* <Header /> */}
        {/* <Navbar /> */}
      {/* </section> */}
      <section className='container'>
        <About />
        <Application />
        <Education />
        <Contact />
        <Footer />
      </section>
        <Popup />
    </div>
  )
}

export default Home