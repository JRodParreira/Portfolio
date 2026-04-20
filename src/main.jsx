import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext' // Importa o provider
import { ThemeProvider } from './context/ThemeContext'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider> {/* O Provider vem primeiro */}
        <HashRouter>
          <App />
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
