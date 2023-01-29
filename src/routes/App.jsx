import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "../components/organisms/Header";
import Home from '../pages/Home'
import Projects from "../pages/Projects";
import NotFound from '../pages/NotFound'

function App() {
  return (
    <>
      {/* <Header />
      <span className="background__intersection"></span> */}

      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
