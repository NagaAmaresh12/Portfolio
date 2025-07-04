import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarouselProvider } from './context/contextProvider.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarouselProvider>
      <ToastContainer position="top-center" autoClose={3000} />
      <App />
    </CarouselProvider>
  </StrictMode>,
)
