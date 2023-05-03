import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "../components/organisms/Header";
import Home from '../pages/Home'
import Projects from "../pages/Projects";
import Certificates from "../pages/Certificates";
import NotFound from '../pages/NotFound';

function App() {
  return (
    <>
      {/* <Header />
      <span className="background__intersection"></span> */}

      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
