import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from '../pages/Home'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={
              <div>
                <h1>Error 404, not found</h1>
              </div>
            } />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
