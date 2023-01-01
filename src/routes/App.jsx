import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

import { Routes, Route, BrowserRouter } from "react-router-dom";

// import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home'

// import { BrowserRouter } from "react-router-dom";

// import { Router } from "./router";

function App() {
  const [count, setCount] = useState(0)

  return (
    // <div className="App">
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src="/vite.svg" className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://reactjs.org" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </div>
    
    // <Routes>
    //   <Route index element={<Home />} />
    //   {/* <Route path="/other" element={<Other />} /> */}
    //   {/* <Route path="*" element={<NotFound />} /> */}
    // </Routes>
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<LogIn />} /> */}
            {/* <Route path="/logout" element={<LogOut />} /> */}
            {/* <Route path="/records" element={<Records />} /> */}
            <Route path="/hola" element={
              <div>
                <h1>Hola Navegador</h1>
              </div>
            } />
            {/* <Route path="*" element={<NotFound />}/> */}
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
