import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer"
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      {/* <Header /> */}
      <React.StrictMode>
      <BrowserRouter>
          <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/hola" element={<h1>Hola Navegator</h1>} />
          </Routes>
      </BrowserRouter>
      </React.StrictMode>
      <Footer />      
    </>
  );
};

export default App;
