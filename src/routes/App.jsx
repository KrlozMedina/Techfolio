import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from '../pages/Home'
import Projects from "../pages/Projects";
import Education from "../pages/Education";
import NotFound from '../pages/NotFound';
import AboutMe from "../pages/AboutMe";
import ContactMe from '../pages/ContactMe'
import CV from "../pages/CV";
import Register from "../pages/Register";

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
            <Route path="/cv" element={<CV />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
