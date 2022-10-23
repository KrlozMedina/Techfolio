import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Footer from "@components/Footer"
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";

import '@styles/_vars.scss'

const App = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <React.StrictMode> */}
      <BrowserRouter>
          <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/hola" element={<h1>Hola Navegator</h1>} />
          </Routes>
      </BrowserRouter>
      {/* </React.StrictMode> */}
      {/* <Footer />       */}
    </>
  );
};

export default App;