import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import './styles/global.css'
import { LanguageContextProvider } from './context/LanguageContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageContextProvider>
      <App />
    </LanguageContextProvider>
  </React.StrictMode>
)
