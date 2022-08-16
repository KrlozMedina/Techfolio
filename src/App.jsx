import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Footer from "./components/Footer"
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

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
      <Footer />      
    </>
  );
};

export default App;


// import { Button, Container, InputGroup } from 'reactstrap';
import { ThemeContext, themes } from '@hooks/context/themeContext';
// import React from 'react';
// import ToggleDark from './components/toggleDark';

// function App() {
//   const [darkMode, setDarkMode] = React.useState(true);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1 className="text-warning">Dark/Light mode</h1>
//         <InputGroup>
//           <ThemeContext.Consumer>
//             {({ changeTheme }) => (
//               <Button
//                 color="link"
//                 onClick={() => {
//                   setDarkMode(!darkMode);
//                   changeTheme(darkMode ? themes.light : themes.dark);
//                 }}
//               >
//                 <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
//                 <span className="d-lg-none d-md-block">Switch mode</span>
//               </Button>
//             )}
//           </ThemeContext.Consumer>
//         </InputGroup> */}
//       </header>
//     </div>
//   );
// }

// export default App;