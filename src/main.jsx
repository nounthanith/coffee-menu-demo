import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Loading from './ui/Loading.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Loading duration={1200}>
      <App />
    </Loading>
  </StrictMode>,
)
