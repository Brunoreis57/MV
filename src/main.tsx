import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import { BarbershopPage } from './pages/BarbershopPage'
import { AutomotivePage } from './pages/AutomotivePage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/barbearia" element={<BarbershopPage onBack={() => window.location.href = '/'} />} />
        <Route path="/estetica" element={<AutomotivePage onBack={() => window.location.href = '/'} />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
