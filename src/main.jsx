import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
// import './index.css'
import './styles/global.css'
import { LenguajeContextProvider } from './context/LenguajeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LenguajeContextProvider>
      <App />
    </LenguajeContextProvider>
  </React.StrictMode>
)
