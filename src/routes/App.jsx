import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from '../pages/Home'
import Projects from "../pages/Projects";
import Education from "../pages/Education";
import NotFound from '../pages/NotFound';
import AboutMe from "../pages/AboutMe";
import ContactMe from '../pages/ContactMe'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/contactme" element={<ContactMe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
